const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Persona = require('./personas.model')

// Objetivos de cada cliente
const Objetivos = [
    { value: 1, label: "Ganar Masa" },
    { value: 2, label: "Perder Peso" },
    { value: 3, label: "Mantemiento" },
    { value: 4, label: "Comer" }
];

const Cliente = sequelize.define('Cliente', {
    edad: {
        type: DataTypes.INTEGER,
        defaultValue: 18 
    },
    peso: DataTypes.FLOAT,
    estatura: DataTypes.FLOAT,
    objetivo: {
        type: DataTypes.INTEGER,
        validate: {
            isIn: [Objetivos.map(ob => ob.value)]
        }
    },
    preferencias: DataTypes.TEXT,
    observaciones: DataTypes.TEXT,
    premium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

Cliente.belongsTo(Persona);

module.exports = Cliente;