const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/users');
const getUserAggregation = require('../aggregations/get-user');
const {
  AppError,
  errorCodes,
} = require('./errors');
const { getSHA } = require('./utils');
const { ObjectId } = require('mongodb');

/**
 * @description Function responsible for passport user
 * @param passport {object} - Passport object
 */
function setStrategy (passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, done) => {
    Users.get({ email }, {
      aggregationPipeline: getUserAggregation,
    })
      .then((userData) => {
        if (userData) {
          if (userData.accountActivation.isActive === false) {
            // user account is not active
            throw new AppError(errorCodes.ACCOUNT_IS_NOT_ACTIVE, {
              httpStatus: 400,
            });
          } else if (userData.password === getSHA(password)) {
            done(null, userData);
          } else {
            // invalid password
            throw new AppError(errorCodes.INVALID_CREDENTIALS);
          }
        } else {
          // invalid username
          throw new AppError(errorCodes.INVALID_CREDENTIALS);
        }
      })
      .catch((error) => {
        done(error);
      });
  }));
}

/**
 * Setting user from session
 * @param _id {string} - Mongodb ObjectId
 * @param done {function}
 */
function deserializeUser (_id, done) {
  // console.log('deserialize', _id);
  Users.get({ _id: ObjectId(_id) }, {
    aggregationPipeline: getUserAggregation,
  })
    .then((userData) => {
      const dataStorageInSession = {
        _id,
        email: userData.email,
        userEvents: userData.userEvents.map(item => ({
          eventId: item.eventId,
          role: item.role,
          teamId: item.teamId,
        })),
      };

      done(null, dataStorageInSession);
    })
    .catch((error) => {
      done(error);
    });
}

/**
 * Setting user to session
 * @param _id {string} - Mongodb ObjectId
 * @param done {function}
 */
function serializeUser (_id, done) {
  // console.log('serialize', _id);
  if (_id) {
    done(null, _id);
  } else {
    done('no _id in serialization', null);
  }
}

module.exports = {
  setStrategy,
  serializeUser,
  deserializeUser,
};
