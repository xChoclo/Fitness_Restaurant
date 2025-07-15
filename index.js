const express = require('express');
const app =  express();
const path = require("path");
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/passport');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const Plato = require('./models/platos.models');

// Traer dependencias
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/base')
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use((req, res, next) => {
    res.locals.sesion_iniciada = req.session?.sesion_iniciada || false;
    res.locals.rol_usuario = req.session?.rol_usuario || null;
    res.locals.messages = []; // Siempre disponible para EJS
    next();
});


// Variables de entorno
dotenv.config();

// Sesión de Facebook
app.use(session({
    secret: "Nico1036939351",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) =>{ res.redirect('/perfil_cliente'); }
);


// Traer las rutas
const indexRoutes = require("./routes/index.routes");
const loginRoutes = require("./routes/login.routes");
const perfil_clienteRoutes = require("./routes/perfil_cliente.routes");
const chatBotRoutes = require('./routes/chatbot.routes');
const facturaRoutes = require('./routes/factura.routes');
const menuRoutes = require('./routes/menu.routes'); // Importa la ruta

// Uso de las rutas
app.use('/', indexRoutes);
app.use('/login', loginRoutes);
app.use("/perfil_cliente", perfil_clienteRoutes);
app.use('/api/chat', chatBotRoutes);
app.use('/factura', facturaRoutes);
app.use('/menu', menuRoutes); // Usa la ruta


sequelize.sync({ alter: true }) // O { force: true } para borrar y crear de nuevo
  .then(() => {
    console.log('Tablas sincronizadas');
    // 🚀 Iniciar el servidor
    const PORT = 8000;
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Error al sincronizar las tablas:', err);
  });