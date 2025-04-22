const express = require('express');
require('./db'); // Conexión a la base de datos
const db = require('./models/clientes.model.js'); // Importar modelos
const {enrutamiento,exp} = require('./routes/router');


const app =  express()
app.use(express.json()); // Permitir JSON en las peticiones

app.get('', (req,res)=>{
    res.write("Hola mundo.");
    res.end();
})

app.get('/clientes', async (req, res) => {
    try {
        const clientes = await db.Cliente.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
});


// 🚀 Iniciar el servidor
const PORT = 8090;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));