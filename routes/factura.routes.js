// routes/facturaRoutes.js
const express = require('express');
const router = express.Router();
const { crearFactura } = require('../controllers/factura.controller');

// Middleware para permitir JSON y evitar problemas con csrf (ya que no se usa aquí)
router.post('/crear', crearFactura);

module.exports = router;