const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Persona = require('./personas.model')

const Administrador = sequelize.define("Administrador", {
    examenesMedicos: DataTypes.TEXT,
    eps: DataTypes.TEXT,
    experienciaLaboral: DataTypes.TEXT,
});
Administrador.belongsTo(Persona);