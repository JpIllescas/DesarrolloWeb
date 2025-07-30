module.exports = (sequelize, Sequelize) => {
    const Proveedor = sequelize.define("proveedor", {
        id_proveedor: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        contacto: {
            type: Sequelize.STRING
        },
        correo: {
            type: Sequelize.STRING
        }
    });
    return Proveedor;
};