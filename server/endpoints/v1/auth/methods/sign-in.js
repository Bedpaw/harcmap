const passport = require('passport');
const {
  AppError,
  errorCodes,
  handleErrors,
} = require('../../../../libs/errors');
const Users = require('../../../../models/users');
const getUserAggregation = require('../../../../aggregations/get-user');

/**
 * @description Check if user participle in any event and clear array if not
 * @param userEvents {array}
 * @return {array}
 */
function unifyUserEventsField (userEvents) {
  const noUserEvents = userEvents.length === 1 && !userEvents[0].eventId;

  return noUserEvents ? [] : userEvents;
}

/**
 * @description Generate one format of response
 * @param userData {object} - user data from session/database
 * @return {{userId, email, userEvents}}
 */
function generateUserResponse (userData) {
  return {
    userId: userData._id,
    email: userData.email,
    userEvents: unifyUserEventsField(userData.userEvents),
  };
}

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
      // received empty body fo unauthenticated user
      if (!authenticateAppError && !userData) {
        return handleErrors(new AppError(errorCodes.NOT_LOGGED, {
          httpStatus: 401,
        }), request, response, next);
      }
      // authenticate errors
      if (authenticateAppError || !userData) {
        const errorCode = authenticateAppError ? authenticateAppError.code : null;

        if (errorCode) {
          return handleErrors(new AppError(errorCode, {
            httpStatus: 401,
          }), request, response, next);
        } else {
          // unhandled error
          return handleErrors(authenticateAppError, request, response, next);
        }
      }

      // run serialize user to session(request.user) logic
      request.login(userData._id, (serializeAppError) => {
        // serialization error
        if (serializeAppError) {
          return handleErrors(new AppError(errorCodes.SERIALIZE_ERROR, {
            details: serializeAppError,
          }), request, response, next);
        }

        response.send(generateUserResponse(userData));
      });
    })(request, response, next);
  } else {
    // for authenticated user - return information about self
    const userData = await Users.get({ email: user.email }, {
      aggregationPipeline: getUserAggregation,
    });

    response.send(generateUserResponse(userData));
  }
}

module.exports = signIn;
