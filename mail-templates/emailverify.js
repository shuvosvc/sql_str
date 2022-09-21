const path = require('path');
const hbs = require('nodemailer-express-handlebars');

const { transport } = require('../util/permission');

require('dotenv').config();
const { DASHBOARD_URL, MESSANGER_MAIL } = process.env;

async function sendEmailVerification(mailObj) {
  const { name, email, otp } = mailObj;

  try {
    const handlebarOptions = {
      viewEngine: {
        extName: '.handlebars',
        partialsDir: path.join(__dirname, '/handlebarTemplates'),
        defaultLayout: false,
      },
      viewPath: path.join(__dirname, '/handlebarTemplates'),
      extName: '.handlebars',
    };

    transport.use('compile', hbs(handlebarOptions));
    const verifyUrl = `${DASHBOARD_URL}/otp-validate?otp=${otp}&email=${email}`;

    const mailOptions = {
      from: MESSANGER_MAIL,
      to: email,
      subject: 'Active Site Box account',
      template: 'emailVerify',
      context: {
        name: name && name,
        // DASHBOARD_URL,
        verifyUrl,
        otp,
      },
    };

    await transport.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  sendEmailVerification,
};
