 const db = require("../models");
const Departamento = db.departamentos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const departamento = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    };

    Departamento.create(departamento)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Departamento."
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : null;

    Departamento.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Departamentos."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Departamento.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Departamento with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Departamento.update(req.body, {
        where: { id_departamento: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Departamento was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Departamento with id=${id}. Maybe Departamento was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Departamento with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Departamento.destroy({
        where: { id_departamento: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Departamento was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Departamento with id=${id}. El Departamentono fue encontado!`
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
    Departamento.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Departamentos were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Departamentos."
            });
        });
};

exports.findAllStatus = (req, res) => {
    Departamento.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Departamento."
            });
        }); 
};