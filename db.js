const mongoose = require('mongoose');

const URI = 'mongodb+srv://Nico_Bustamante:Nico_Bustamante@adso2846458.ccnbr.mongodb.net/FitnessRestaurant';

mongoose.connect(URI)
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error de conexión:', err));

module.exports = mongoose;
