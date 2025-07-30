module.exports = (sequelize, Sequelize) => {
    const Departamento = sequelize.define("departamento", {
        id_departamento: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        }
    });
    return Departamento;
};