const exp = require('express');

const modeloCliente = require('../models/clientes.model');

const router = exp.Router();

router.get('/clientes', async (req, res) => {
    try {
        const clientes = await modeloCliente.find();
        console.log(clientes);
        res.send(clientes);
    } catch (error) {
        console.log(clientes)
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
})

module.exports = router;