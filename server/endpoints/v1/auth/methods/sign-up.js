const { getSHA } = require('../../../../libs/utils');
const { generateRandomString } = require('../../../../../vendors/random');
const Users = require('../../../../models/users');

// registration
async function signUp (userObject) {
  Object.assign(userObject, {
    password: getSHA(userObject.password),
    accountActivation: {
      isActive: false,
      key: getSHA(generateRandomString(10)),
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

  return {
    success,
    error,
    errorDetails,
  };
}

module.exports = signUp;
