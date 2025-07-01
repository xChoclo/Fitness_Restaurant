const enviarCorreo = require('./config/enviarCorreo');

exports.login = (req, res) => {
    res.render('login', {
        layout: false,
        sesion_iniciada: req.session?.sesion_iniciada || false,
        rol_usuario: req.session?.rol_usuario || null,
        messages: []
    });
};

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