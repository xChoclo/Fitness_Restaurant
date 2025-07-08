const express = require('express');
const app =  express();
const path = require("path");
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./config/passport');
const dotenv = require('dotenv');

// Traer dependencias
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/base')
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

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
const chatBotRoutes = require('./routes/chatbot.routes')


// Uso de las rutas
app.use('/', indexRoutes);
app.use('/login', loginRoutes);
app.use("/perfil_cliente", perfil_clienteRoutes);
app.use('/api/chat', chatBotRoutes);


// 🚀 Iniciar el servidor
const PORT = 8090;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));