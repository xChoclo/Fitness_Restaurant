const exp = require('express');
const router = exp.Router();
const loginControlador = require('../controllers/login.controller');

router.get('/', loginControlador)

module.exports = router;