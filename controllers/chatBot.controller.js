const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.chatBot = (req, res) => {
    res.render('chatBot', {
            layout: 'layouts/base',
            sesion_iniciada: req.session?.sesion_iniciada || false,
            rol_usuario: req.session?.rol_usuario || null,
            messages: []
        });
};

exports.sendPrompt = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Falta el prompt en el cuerpo del chat.' });
    }

    try {
        const model = genAI.getGenerativeModel({ model:"gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response.text();
        res.json({ response });
    } catch (err) {
        console.error("Error al generar respuesta: ", err);
        res.status(500).json({ error: 'Ocurrió un error al procesar el mensaje.' });
    }
};