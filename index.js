const express = require('express');
require('./db'); // Conexión a la base de datos
const db = require('./models/clientes.model'); // Importar modelos
const enrutamiento = require('./routes/router');

const app =  express()
const path = require('path');

app.set('views', path.join(__dirname, 'views'));


app.set('views', __dirname + '/views/aplicativo');

app.use(express.json()); // Permitir JSON en las peticiones

app.set('view engine', 'ejs');

app.get('', (req,res)=>{    
    res.render('index');
})

app.use("/v1", enrutamiento);

app.get('/clientes', async (req, res) => {
    try {
        const clientes = await db.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
});


// 🚀 Iniciar el servidor
const PORT = 8090;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));