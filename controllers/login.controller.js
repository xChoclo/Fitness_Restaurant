exports.login = (req, res) => {
    res.render('login', {
        layout: false,
        sesion_iniciada: req.session?.sesion_iniciada || false,
        rol_usuario: req.session?.rol_usuario || null,
        messages: []
    });
};