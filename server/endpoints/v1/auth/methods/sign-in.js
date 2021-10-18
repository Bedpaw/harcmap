const passport = require('passport');
const {
  AppError,
  errorCodes,
  handleErrors,
} = require('../../../../libs/errors');
const Users = require('../../../../models/users');
const getUserAggregation = require('../../../../aggregations/get-user');

// Login
async function signIn (request, response, next) {
	const userIsAuthenticated = request.isAuthenticated();
	const {
		user,
		body,
	} = request;
	const bodyLength = Object.keys(body).length;

	if (!userIsAuthenticated || bodyLength) {
		// run authenticate logic
		passport.authenticate('local', (authenticateAppError, userData) => {
			// authenticate errors
			if (authenticateAppError || !userData) {
				const errorCode = authenticateAppError
					? errorCodes.INVALID_CREDENTIALS
					: errorCodes.NOT_LOGGED;

				return handleErrors(new AppError(errorCode, {
					httpStatus: 401,
				}), request, response, next);
			}

			// run serialize user to session(request.user) logic
			request.login(userData._id, (serializeAppError) => {
				// serialization error
				if (serializeAppError) {
					return handleErrors(new AppError(errorCodes.SERIALIZE_ERROR, {
						details: serializeAppError,
					}), request, response, next);
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
