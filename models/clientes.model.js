const mongoose = require('../db');

const ClienteSchema = new mongoose.Schema({
    edad: Number,
    peso: String,
    estatura: Number,
    objetivo: String,
    preferencias: String,
    observaciones: String
}, {versionKey: false});

const Cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = Cliente;