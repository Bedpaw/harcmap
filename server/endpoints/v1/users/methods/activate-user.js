const Users = require('../../../../models/users');
const { AppError, errorCodes } = require('../../../../libs/errors');

async function activateUser (response, key) {
  const user = await Users.get({ 'accountActivation.key': key });

  if (!user) {
    throw new AppError(errorCodes.INVALID_ACTIVATION_KEY, {
      httpStatus: 400,
    });
  }

  const updatedUser = await Users.update({ _id: user._id }, {
    accountActivation: {
      isActive: true,
      key: null,
    },
  });

  if (!updatedUser.success) {
    throw new AppError(errorCodes.CANNOT_UPDATE_USER_ACTIVATION, {
      httpStatus: 500,
      details: updatedUser.errorDetails,
    });
  }

  response.redirect('/login?accountActivated');
}

module.exports = activateUser;
