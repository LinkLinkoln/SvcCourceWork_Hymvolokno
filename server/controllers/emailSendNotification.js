const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Или другой SMTP-сервис
  auth: {
    user: "sednemail75@gmail.com", // Ваш email
    pass: "becv yclz gngs nulq", // Пароль или app password
  },
});

const subscribeUser = (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: "sednemail75@gmail.com",
    to: email,
    subject: "Подписка на Химволокно",
    text: "Вы подписались на Химволокно. Спасибо!",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);  // Логируем ошибку
      return res.status(500).send("Error sending email");  // Возвращаем ошибку клиенту
    }
    console.log("Email sent:", info.response);  // Логируем успешную отправку
    return res.status(200).send("Email sent successfully");
  });
};

module.exports = {
  subscribeUser,
};
