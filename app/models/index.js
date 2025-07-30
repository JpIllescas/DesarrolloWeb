const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle, 
        },
        /*¨ssl:{require: true}*/
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
            }
        }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.clientes =  require("./cliente.model.js")(sequelize,Sequelize);
db.productos = require("./producto.model.js")(sequelize,Sequelize);
db.pedidos = require("./pedido.model.js")(sequelize,Sequelize);
db.detalle_pedidos = require("./detalle_pedido.model.js")(sequelize,Sequelize);
db.empleados = require("./empleado.model.js")(sequelize,Sequelize);
db.proveedores = require("./proveedor.model.js")(sequelize,Sequelize);
db.departamentos = require("./departamento.model.js")(sequelize,Sequelize);

module.exports = db;

// Relaciones

db.clientes.hasMany(db.pedidos, { foreignKey: 'id_cliente' });
db.pedidos.belongsTo(db.clientes, { foreignKey: 'id_cliente' });

db.pedidos.hasMany(db.detalle_pedidos, { foreignKey: 'id_pedido' });
db.detalle_pedidos.belongsTo(db.pedidos, { foreignKey: 'id_pedido' });

db.productos.hasMany(db.detalle_pedidos, { foreignKey: 'id_producto' });
db.detalle_pedidos.belongsTo(db.productos, { foreignKey: 'id_producto' });

module.exports = db;
