const express = require('express');
const router = express.Router();
const chatBotControlador = require('../controllers/chatBot.controller');

router.get('/', chatBotControlador.chatBot);

router.post('/', chatBotControlador.sendPrompt);

module.exports = router;