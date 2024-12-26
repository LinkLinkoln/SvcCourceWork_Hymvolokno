const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: "sednemail75@gmail.com", 
    pass: "becv yclz gngs nulq", 
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
      console.error("Error sending email:", error);  
      return res.status(500).send("Error sending email");  
    }
    console.log("Email sent:", info.response);  
    return res.status(200).send("Email sent successfully");
  });
};

module.exports = {
  subscribeUser,
};
