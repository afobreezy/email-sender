const express = require("express");
const app = express();
const transport = require("./helpers/smtpTransport");
const envVariables = require("./constants/index");

app.use(express.json());

const { USER_EMAIL } = envVariables;

app.get("/", (req, res) => {
  res.send("This is my email sender app");
});

app.post("/email/send", (req, res) => {
  const { email, message } = req.body;

  const mailOptions = {
    to: email,
    from: USER_EMAIL,
    subject: "Testing email Service",
    html: `<h1>This is a test of our email service</h1>`,
  };

  transport.sendMail(mailOptions, (error) => {
    if (error) {
      return console.log(error);
    }

    res.status(200).json({ message: "Email sent successfully" });
  });
});

module.exports = app;
