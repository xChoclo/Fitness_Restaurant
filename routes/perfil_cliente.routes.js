const exp = require('express');
const router = exp.Router();
const perfil_clienteControlador = require("../controllers/perfil_cliente.controller");

router.get("/", perfil_clienteControlador.mostrarPerfil);

module.exports = router;