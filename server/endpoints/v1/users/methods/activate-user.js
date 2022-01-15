const Users = require('../../../../models/users');
const logger = require('../../../../libs/logger');
const { errorCodes } = require('../../../../libs/errors');

async function activateUser (response, key) {
  const user = await Users.get({ 'accountActivation.key': key });

  if (!user) {
    logger.error(errorCodes.INVALID_ACTIVATION_KEY);
    response.redirect('/activation-wrong');
  }

  const updatedUser = await Users.update({ _id: user._id }, {
    accountActivation: {
      isActive: true,
      key: null,
    },
  });

  if (!updatedUser.success) {
    logger.error(errorCodes.CANNOT_UPDATE_USER_ACTIVATION, {
      details: updatedUser.errorDetails,
    });
    response.redirect('/activation-wrong');
  } else {
    response.redirect('/activation-done');
  }
}

module.exports = activateUser;
