const transporter = require('./mailer');

const sendWelcomeEmail = async (toEmail, userName) => {
  const mailOptions = {
    from: '"Tu App" bustamantenicolas141@gmail.com',
    to: toEmail,
    subject: '¡Bienvenido a la plataforma!',
    html: `<h1>Hola ${userName},</h1><p>¡Bienvenido a Fitness Restaurant!</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo de bienvenida enviado a', toEmail);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

module.exports = sendWelcomeEmail;