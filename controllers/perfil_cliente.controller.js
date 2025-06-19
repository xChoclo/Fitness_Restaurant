exports.mostrarPerfil = (req, res) =>{
    res.render('usuario/perfil_cliente', {
        layouts: 'layouts/base',
        sesion_iniciada: req.session?.sesion_iniciada || false,
        rol_usuario: req.session?.rol_usuario || null,
        messages: []
    });
};