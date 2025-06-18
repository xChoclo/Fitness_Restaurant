const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const encriptarContraseña = async (password) =>{
    return bcrypt.hash(password, 10);
};

const contraseñaPermitida = (password) =>{
    return password && password.length > 0;
};

const Persona = sequelize.define('Persona', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cedula: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: true
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    direccion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    rh: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

Persona.beforeSave(async (persona) =>{
    if (!contraseñaPermitida(persona.contraseña)) {
        persona.contraseña = await encriptarContraseña(persona.contraseña);
    };
});

module.exports = Persona;