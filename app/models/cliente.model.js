module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("cliente", {
        id_cliente:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        },
        direccion: {
            type : Sequelize.STRING
        },
        correo: {
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.STRING
        }
        
    });
    return Cliente;
};