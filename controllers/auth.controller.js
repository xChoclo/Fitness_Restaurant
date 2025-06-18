login = (req, res) =>{
    res.render('login', {
        layout: false,
        sesion_iniciada: req.session?.sesion_iniciada || false,
        messages: []
    });
};

module.exports = login;