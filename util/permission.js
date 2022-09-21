require("dotenv").config();
const nodemailer = require("nodemailer");

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;

const transport = nodemailer.createTransport({
  // host: MAIL_HOST || "localhost",
  // port: MAIL_PORT || 1025,
  // // secure: true,
  service: "gmail",
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

module.exports = {
  transport,
};
