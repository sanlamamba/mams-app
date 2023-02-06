const nodemailer = require("nodemailer");
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.ionos.fr",
  auth: {
    user: "contact@nhqlv.fr",
    pass: "Mams67@@",
  },
  secure: true,
});

const mailData = {
  from: "youremail@gmail.com",
  to: "myfriend@gmail.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
  html: "<b>Hey there! </b> <br> This is our first message sent with Nodemailer<br/>",
};

module.exports = transporter;
