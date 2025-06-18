const express = require('express');
const path = require("path");
const expressLayouts = require('express-ejs-layouts');
const app =  express()

app.set('views', path.join(__dirname, 'views'));
app.set('views', __dirname + '/views/aplicativo');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));

const indexRoutes = require("./routes/index.routes")

app.use('/', indexRoutes);

// 🚀 Iniciar el servidor
const PORT = 8090;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));