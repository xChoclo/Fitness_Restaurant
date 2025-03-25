const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    edad: Number,
    peso: String,
    estatura: Number,
    objetivo: String,
    preferencias: String,
    observaciones: String
}, { collection: 'FitnessRestaurant.Clientes' });

const Cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = Cliente;