const Users = require('../../../../models/users');
const { sendResetPasswordMail } = require('../../../../libs/mail');
const { getSHA } = require('../../../../libs/utils');
const { generateRandomString } = require('../../../../../vendors/random');
const { AppError, errorCodes } = require('../../../../libs/errors');

async function requestResetPassword (email) {
  const user = await Users.get({ email });

  // we dont send information about not exist user for given mail
  // for security reasons
  if (user) {
    // send mail
    const resetPasswordKey = getSHA(generateRandomString(6));

    const updatedUser = await Users.update({ _id: user._id }, {
      passwordReset: {
        key: resetPasswordKey,
        date: Date.now(),
      },
    });

    if (!updatedUser.success) {
      throw new AppError(errorCodes.CANNOT_UPDATE_USER_RESET_PASSWORD_REQUEST, {
        httpStatus: 500,
      });
    }

    await sendResetPasswordMail('kosz@henouser.pl', resetPasswordKey);

  }
}

module.exports = requestResetPassword;
