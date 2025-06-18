const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./clientes.model');

const Factura = sequelize.define("Factura", {
    fecha: {
        type: DataTypes.DATE,
        allowNull: true
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: true
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
});
Factura.belongsTo(Cliente);

module.exports = Factura;