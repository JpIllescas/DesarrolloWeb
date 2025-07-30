 const db = require("../models");
const Pedido = db.pedidos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.id_cliente) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const pedido = {
        id_cliente: req.body.id_cliente,
        fecha: req.body.fecha,
        total: req.body.total
    };

    Pedido.create(pedido)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Pedido."
            });
        });
};

exports.findAll = (req, res) => {
    const id_cliente = req.query.id_cliente;
    var condition = id_cliente ? { id_cliente: { [Op.iLike]: `%${id_cliente}%` } } : null;

    Pedido.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pedidos."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Pedido.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Pedido with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Pedido.update(req.body, {
        where: { id_pedido: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pedido was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Pedido with id=${id}. Maybe Pedido was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Pedido with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Pedido.destroy({
        where: { id_pedido: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Pedido was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Pedido with id=${id}. El pedido no fue encontado!`
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
    Pedido.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Pedidos were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all pedidos."
            });
        });
};

exports.findAllStatus = (req, res) => {
    Pedido.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Pedido."
            });
        }); 
};