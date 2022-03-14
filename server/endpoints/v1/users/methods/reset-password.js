const Users = require('../../../../models/users');
const {
  AppError,
  errorCodes,
} = require('../../../../libs/errors');
const { getSHA } = require('../../../../libs/utils');

async function resetPassword (key, password) {
  const user = await Users.get({ 'passwordReset.key': key });

  if (!user) {
    throw new AppError(errorCodes.INVALID_RESET_KEY, {
      httpStatus: 400,
    });
  }

  // check if key dont expired
  const { date } = user.passwordReset;
  const twentyFourTimeLimit = Date.now() - (24 * 60 * 60 * 1000);
  if (date < twentyFourTimeLimit) {
    throw new AppError(errorCodes.PASSWORD_RESET_KEY_EXPIRED, {
      httpStatus: 400,
    });
  }

  const updatedUser = await Users.update({ _id: user._id }, {
    passwordReset: {
      key: null,
      date: null,
    },
    password: getSHA(password),
  });

  if (!updatedUser.success) {
    throw new AppError(errorCodes.CANNOT_UPDATE_USER_RESET_PASSWORD, {
      httpStatus: 500,
    });
  }

  return {
    success: updatedUser.success,
  };
}

module.exports = resetPassword;
