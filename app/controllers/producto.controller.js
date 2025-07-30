 const db = require("../models");
const Producto = db.productos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const producto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        stock: req.body.stock
    };

    Producto.create(producto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Producto."
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Producto.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Producto.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Producto with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Producto.update(req.body, {
        where: { id_producto: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Producto was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Producto with id=${id}. Maybe Producto was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Producto with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Producto.destroy({
        where: { id_producto: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Producto was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Producto with id=${id}. El producto no fue encontado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Producto.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Products were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all products."
            });
        });
};

exports.findAllStatus = (req, res) => {
    Producto.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Producto."
            });
        }); 
};