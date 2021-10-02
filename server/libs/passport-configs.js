const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/users');
const { AppError, errorCodes } = require('./errors');
const { getSHA } = require('./utils');
const { ObjectId } = require('./mongodb');

/**
 * @description Function responsible for passport user
 * @param passport {object} - Passport object
 */
function setStrategy (passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, done) => {

    console.log(email, password);

    Users.get({ email })
      .then((userData) => {
        if (userData && userData.password === getSHA(password)) {
          done(null, userData);
        } else {
          // invalid username or password
          throw new AppError(errorCodes.INVALID_CREDENTIALS, {
            httpStatus: 401,
          });
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
  console.log('deserialize', _id);
  Users.get({ _id: ObjectId(_id) })
    .then((userData) => {
      const dataInSession = {
        _id,
        email: userData.email,
        userEvents: [],
      };

      done(null, dataInSession);
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
  console.log('serialize', _id);
  if (!_id) {
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
