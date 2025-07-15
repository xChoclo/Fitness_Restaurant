const Plato = require('../models/platos.models');

const getMenu = async (req, res) => {
    try {
        const data = await Plato.findAll(); // Sequelize
        res.render('menu', { data });
    } catch (err) {
        console.error('Error al obtener platos:', err);
        res.status(500).send('Error del servidor');
    }
};

module.exports = { getMenu };