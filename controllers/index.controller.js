exports.index = (req, res) =>{
    res.render('index', {
        layout: 'layouts/base',
        sesion_iniciada: req.session?.sesion_iniciada || false,
        rol_usuario: req.session?.rol_usuario || null,
        messages: []
    });
};