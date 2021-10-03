const { errorCodes, AppError } = require('../../../../libs/errors');

// logout
async function signOut (request, response) {
  if (request.isAuthenticated()) {
    request.logout();
    response.send({
      success: true,
    });
  } else {
    throw new AppError(errorCodes.CANNOT_LOGOUT_UNAUTHORIZED_USER, {
      httpStatus: 401,
    });
  }
}

module.exports = signOut;
