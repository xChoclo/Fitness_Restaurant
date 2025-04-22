const exp = require('express');

const modeloCliente = require('../models/clientes.model');

const router = exp.Router();

router.get('/clientes', async (req, res) => {
    try {
        const clientes = await modeloCliente.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
})