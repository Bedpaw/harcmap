const { getSHA } = require('../../../../libs/utils');
const { generateRandomString } = require('../../../../../vendors/random');
const Users = require('../../../../models/users');
const { sendActivationMail } = require('../../../../libs/mail');

// registration
async function signUp (body) {
  const activationKey = getSHA(generateRandomString(10));
  const { email, password, invitationKey } = body;

  const userObject = {
    email,
    password: getSHA(password),
    accountActivation: {
      isActive: false,
      key: activationKey,
    },
    passwordReset: {
      key: null,
      date: null,
    },
    accountCreated: Date.now(),
    userEvents: [],
  };

  const {
    success,
    error,
    errorDetails,
  } = await Users.create(userObject);

  await sendActivationMail(userObject.email, activationKey, invitationKey);

  return {
    success,
    error,
    errorDetails,
  };
}

module.exports = signUp;
