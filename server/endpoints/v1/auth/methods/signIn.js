const passport = require('passport');
const {
  handleErrors,
  AppError,
  errorCodes,
} = require('../../../../libs/errors');

// Login
function signIn (request, response, next) {
  const isAuth = request.isAuthenticated();
  const { user } = request;

  if (!isAuth) {
    passport.authenticate('local', (authenticateAppError, userData) => {
      if (authenticateAppError || !userData) {
        throw new AppError(errorCodes.NOT_LOGGED, {
          httpStatus: 401,
        });
        // handleErrors(authenticateAppError, request, response, next);
      } else {
        request.login(userData._id, (serializeAppError) => {
          if (serializeAppError) {
            handleErrors(serializeAppError, request, response, next);
          } else {
            const responseData = {
              email: userData.email,
              userEvents: [],
            };

            response.send(responseData);
          }
        });
      }
    })(request, response, next);
  } else {
    const responseData = {
      email: user.email,
      userEvents: user.userEvents,
    };

    response.send(responseData);
  }
}

module.exports = signIn;
