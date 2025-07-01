const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bustamantenicolas141@gmail.com',
    pass: 'cryc gwng veys efxb'
  }
});

module.exports = transporter;