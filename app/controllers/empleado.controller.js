 const db = require("../models");
const Empleado = db.empleados;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const empleado = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono,
        puesto: req.body.puesto
    };

    Empleado.create(empleado)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the empleado."
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Empleado.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving empleados."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Empleado.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Empleado with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Empleado.update(req.body, {
        where: { id_empleado: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Empleado was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update empleado with id=${id}. Maybe empleado was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating empleado with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Empleado.destroy({
        where: { id_empleado: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "empleado was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete empleado with id=${id}. El Empleado no fue encontado!`
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
    Empleado.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} empleados were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all empleados."
            });
        });
};

exports.findAllStatus = (req, res) => {
    Empleado.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving empleado."
            });
        }); 
};