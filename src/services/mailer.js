const keys = require("../config/mailer.config");
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: keys.EXT_OUTLOOK_SMTP_SERVICE,
  host: keys.EXT_OUTLOOK_SMTP_HOST,
  secure: keys.SMTP_SSL,
  secureConnection: keys.SMTP_SSL,
  auth: {
    user: keys.EXT_OUTLOOK_SMTP_USER,
    pass: keys.EXT_OUTLOOK_SMTP_PASS
  },
  port: keys.EXT_OUTLOOK_SMTP_PORT,
  tls: {
    rejectUnauthorized: false,
    ciphers: 'SSLv3'
  }
});

exports.sendEmail = async (email, subject, text, callback) => {
  await transport.sendMail({
    to: email,
    from: keys.EXT_OUTLOOK_SMTP_USER,
    subject: subject,
    text: text
  }, (err, info) => {
    // OVERRIDE ERROR DETECING . 
    if (callback) callback(err, info);
  });
}
