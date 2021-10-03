const passport = require('passport');
const {
  AppError,
  errorCodes,
} = require('../../../../libs/errors');
const Users = require('../../../../models/users');
const getUserAggregation = require('../../../../aggregations/get-user');

// Login
async function signIn (request, response, next) {
  const userIsAuthenticated = request.isAuthenticated();
  const { user } = request;

  if (!userIsAuthenticated) {
    // run authenticate logic
    passport.authenticate('local', (authenticateAppError, userData) => {
      // authenticate errors
      if (authenticateAppError || !userData) {
        throw new AppError(errorCodes.NOT_LOGGED, {
          httpStatus: 401,
        });
      }

      // run serialize user to session(request.user) logic
      request.login(userData._id, (serializeAppError) => {
        // serialization error
        if (serializeAppError) {
          throw new AppError(errorCodes.SERIALIZE_ERROR, {
            details: serializeAppError,
          });
        }

        const responseData = {
          email: userData.email,
          userEvents: userData.userEvents,
        };

        response.send(responseData);
      });
    })(request, response, next);
  } else {
    // for authenticated user - return information about self
    const userData = await Users.get({ email: user.email }, {
      aggregationPipeline: getUserAggregation,
    });

    const responseData = {
      email: userData.email,
      userEvents: userData.userEvents,
    };

    response.send(responseData);
  }
}

module.exports = signIn;
