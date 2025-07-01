const express = require('express');
const path = require("path");
const expressLayouts = require('express-ejs-layouts');
const app =  express()
const session = require('express-session');
const passport = require('./config/passport');

// Traer dependencias
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/base')
app.use(express.static(path.join(__dirname, 'public')));

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
const perfil_clienteRoutes = require("./routes/perfil_cliente.routes")  

// Uso de las rutas
app.use('/', indexRoutes);
app.use('/login', loginRoutes);
app.use("/perfil_cliente", perfil_clienteRoutes);

// Enviar correo de bienvenida
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Aquí haces la lógica de autenticación...
    const usuario = await User.findOne({ email });
  
    if (!usuario || !usuario.validPassword(password)) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
  
    // Si el login fue exitoso, envía el correo:
    await enviarCorreo(usuario.email, usuario.nombre);
  
    // Continúa con la respuesta de login
    res.json({ mensaje: 'Login exitoso', usuario });
  });


// 🚀 Iniciar el servidor
const PORT = 8090;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));