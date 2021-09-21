const { getSHA } = require('../../../../libs/utils');
const Users = require('../../../../models/users');
const { generateRandomString } = require('../../../../../vendors/random');

async function addUser (userObject) {
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

  const result = await Users.create(userObject);
  const { success } = result;

  return { success };
}

module.exports = addUser;
