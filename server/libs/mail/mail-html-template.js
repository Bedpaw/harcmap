const {
  MAIL_SERVER_EMAIL,
  SERVER_ADDRESS,
} = process.env;

/**
 * @description Mail template for account activation and rest password
 * @param resetPassword {boolean} - mail with data for reset password
 * if false - contain information for account activation
 * @param key {string} - unique key from database
 * @return {string} - email html content
 */
module.exports = (resetPassword, key) => {
  let title = 'Kliknij w poniższy link, aby aktywować konto';
  let linkTitle = 'AKTYWUJ KONTO';
  let link = `${SERVER_ADDRESS}/api/v1/users/account-activation/${key}`;

  if (resetPassword) {
    title = 'Kliknij w poniższy link, aby zresetować hasło';
    linkTitle = 'ZRESETUJ HASŁO';
    link = `${SERVER_ADDRESS}/reset-password?key=${key}`;
  }

  return `<div>
    <h1>Czuwaj!</h1>
    <h3>${title}</h3>
    <p>${resetPassword ? '<small>Uwaga! Link będzie aktywny przez 24h!</small>' : ''}</p>
    <p>
        <a href="${link}">${linkTitle}</a>
    </p>
    <small>
        <div>Pozdrawiamy</div>
        <div>Ekipa HarcMap</div>
        <div>Site: ${SERVER_ADDRESS}</div>
        <div>Email: ${MAIL_SERVER_EMAIL}</div>
    </small>
</div>`;
};
