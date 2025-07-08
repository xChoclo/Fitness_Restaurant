const exp = require('express');
const router = exp.Router();
const indexControlador = require('../controllers/index.controller');

router.get('/', indexControlador.index);

module.exports = router;