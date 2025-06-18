const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categorias_Platos = [
    { value: 1, label: "Ganar Masa" },
    { value: 2, label: "Perder Peso" },
    { value: 3, label: "Mantemiento" }
];

const Plato = sequelize.define("Plato", {
    nombre: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 0),
        defaultValue: 0
    },
    categoria: {
        type: DataTypes.INTEGER,
        validate: {
            isIn: [Categorias_Platos.map(categoria => categoria.value)]
        }
    }
});

module.exports = Plato;