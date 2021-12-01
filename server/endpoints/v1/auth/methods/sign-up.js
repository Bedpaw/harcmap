const { getSHA } = require('../../../../libs/utils');
const { AppError, errorCodes } = require('../../../../libs/errors');
const { generateRandomString } = require('../../../../../vendors/random');
const Users = require('../../../../models/users');
const { sendActivationMail } = require('../../../../libs/mail');

// registration
async function signUp (userObject) {
  const activationKey = getSHA(generateRandomString(10));

  Object.assign(userObject, {
    password: getSHA(userObject.password),
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
  });

  const {
    success,
    error,
    errorDetails,
  } = await Users.create(userObject);

  await sendActivationMail('kosz@henouser.pl', activationKey);

  return {
    success,
    error,
    errorDetails,
  };
}

module.exports = signUp;
