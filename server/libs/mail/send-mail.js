/**
 * Module responsible for sending mails
 */
const mail = require('nodemailer');
const {
  AppError,
  errorCodes,
} = require('../errors');
const {
  MAIL_SERVER_HOST,
  MAIL_SERVER_PORT,
  MAIL_SERVER_EMAIL,
  MAIL_SERVER_PASSWORD,
} = process.env;

/**
 * @description Send email to another
 * @param to {string} - email of destiny address
 * @param config {object} - object with properties like: mail subject, content
 * @return {Promise<unknown>}
 */
async function sendMail (to, config) {
  const {
    subject,
    content,
  } = config;

  // server configuration
  try {
    const mailServer = mail.createTransport({
      host: MAIL_SERVER_HOST,
      port: MAIL_SERVER_PORT,
      secure: true,
      auth: {
        user: MAIL_SERVER_EMAIL,
        pass: MAIL_SERVER_PASSWORD,
      },
    });

    // sending message
    await mailServer.sendMail({
      from: `HarcMap ${MAIL_SERVER_EMAIL}`,
      to,
      subject,
      html: content,
    });
  } catch (error) {
    throw new AppError(errorCodes.MAIL_SERVICE_ERROR, {
      details: error,
    });
  }
}

module.exports = sendMail;
