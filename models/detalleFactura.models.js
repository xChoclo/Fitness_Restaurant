const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Plato = require('./platos.models');
const Factura = require('./factura.models');

const DetalleFactura = sequelize.define("DetalleFactura", {
  cantidadProductos: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});
DetalleFactura.belongsTo(Factura);
DetalleFactura.belongsTo(Plato);

module.exports = DetalleFactura;