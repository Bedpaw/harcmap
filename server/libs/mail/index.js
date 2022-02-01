const mailHtmlTemplate = require('./mail-html-template');
const sendMail = require('./send-mail');

async function sendActivationMail (to, key, invitationKey) {
  return await sendMail(to, {
    subject: 'HarcMap - Aktywacja konta',
    content: mailHtmlTemplate(false, key, invitationKey),
  });
}

async function sendResetPasswordMail (to, key) {
  return await sendMail(to, {
    subject: 'HarcMap - Zresetuj hasło do konta',
    content: mailHtmlTemplate(true, key),
  });
}

module.exports = {
  sendResetPasswordMail,
  sendActivationMail,
};
