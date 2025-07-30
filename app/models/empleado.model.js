module.exports = (sequelize, Sequelize) => {
    const Empleado = sequelize.define("empleado", {
        id_empleado: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        correo: {
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.STRING
        },
        puesto: {
            type: Sequelize.STRING
        }
    });
    return Empleado; 
};
