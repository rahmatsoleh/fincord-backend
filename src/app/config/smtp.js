/* eslint-disable no-undef */
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, message }) => {
  const transporter = await nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: dotenv.config().parsed.SMTP_USERNAME,
      pass: dotenv.config().parsed.SMTP_PASSWORD,
    },
  });

  await transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });

  const information = await transporter.sendMail({
    from: dotenv.config().parsed.SMTP_USERNAME,
    to,
    subject,
    html: message,
  }, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;
