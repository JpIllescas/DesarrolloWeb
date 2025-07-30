module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("producto", {
        id_producto: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        precio: {
            type: Sequelize.FLOAT
        },
        stock: {
            type: Sequelize.INTEGER
        }
    });
    return Producto;
};
