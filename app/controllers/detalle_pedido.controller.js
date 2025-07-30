 const db = require("../models");
const DetallePedido = db.detalle_pedidos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.id_pedido) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const detalle_pedido = {
        id_pedido: req.body.id_pedido,
        id_producto: req.body.id_producto,
        cantidad: req.body.cantidad,
        subtotal: req.body.subtotal
    };

    DetallePedido.create(detalle_pedido)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Detalle Pedido."
            });
        });
};

exports.findAll = (req, res) => {
    const id_detalle_pedido = req.query.id_detalle_pedido;
    var condition = id_detalle_pedido ? { id_detalle_pedido: { [Op.iLike]: `%${id_detalle_pedido}%` } } : null;

    DetallePedido.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving detalle pedidos."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    DetallePedido.findByPk(id)
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

    DetallePedido.update(req.body, {
        where: { id_detalle_pedido: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Detalle Pedido was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Detalle Pedido with id=${id}. Maybe Detalle Pedido was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Detalle Pedido with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    DetallePedido.destroy({
        where: { id_detalle_pedido: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Detalle Pedido was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Detalle Pedido with id=${id}. El detalle pedido no fue encontado!`
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
    DetallePedido.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Detalle Pedidos were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all detalle pedidos."
            });
        });
};

exports.findAllStatus = (req, res) => {
    DetallePedido.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Detalle Pedido."
            });
        }); 
};