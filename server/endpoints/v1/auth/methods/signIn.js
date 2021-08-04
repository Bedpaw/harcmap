const passport = require('passport');
const logger = require('../../../../libs/logger');
const { AppError, errorCodes, handleErrors } = require('../../../../libs/errors');

// Login
function signIn(request, response, next) {
	const isAuth = request.isAuthenticated();
	logger.log('isAuth', isAuth);

	if (!isAuth) {
		passport.authenticate('local', (authenticateAppError, userData) => {
			if (authenticateAppError) {
				handleErrors(authenticateAppError, request, response, next);
			} else {
				request.login(userData._id, (serializeAppError) => {
					if (serializeAppError) {
						handleErrors(serializeAppError, request, response, next);
					} else {
						response.send(userData);
					}
				});
			}
		})(request, response, next);
	} else {
		throw new AppError(errorCodes.USER_IS_ALREADY_AUTHENTICATED, {
			httpStatus: 401,
		});
	}
}

module.exports = signIn;
