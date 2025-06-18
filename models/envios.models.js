const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./clientes.model');

const Envios = sequelize.define("Envios", {
    direccion: DataTypes.TEXT,
    indicaciones: DataTypes.TEXT
});
Envios.belongsTo(Cliente);

module.exports = Envios;