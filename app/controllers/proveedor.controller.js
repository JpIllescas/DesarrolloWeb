 const db = require("../models");
const Proveedor = db.proveedores;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const proveedor = {
        nombre: req.body.nombre,
        contacto: req.body.contacto,
        correo: req.body.correo
    };

    Proveedor.create(proveedor)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Proveedor."
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Proveedor.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Proveedores."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Proveedor.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Proveedor with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Proveedor.update(req.body, {
        where: { id_proveedor: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Proveedor was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Proveedor with id=${id}. Maybe Proveedor was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Proveedor with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Proveedor.destroy({
        where: { id_proveedor: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Proveedor was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Proveedor with id=${id}. El Proveedor no fue encontado!`
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
    Proveedor.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Proveedors were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all proveedores."
            });
        });
};

exports.findAllStatus = (req, res) => {
    Proveedor.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Proveedor."
            });
        }); 
};