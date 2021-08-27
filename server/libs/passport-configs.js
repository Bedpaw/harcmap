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
    usernameField: 'username',
    passwordField: 'password',
  }, (username, password, done) => {
    Users.get({ username })
      .then((userData) => {
        const user = userData;
        if (user && user.password === getSHA(password)) {
          done(null, user);
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
  console.log('deserialize');
  Users.get({ _id: ObjectId(_id) })
    .then((userData) => {
      const returnedUserData = userData;
      delete returnedUserData.password;
      delete returnedUserData._id;

      done(null, returnedUserData);
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
  done(null, _id);
}

module.exports = {
  setStrategy,
  serializeUser,
  deserializeUser,
};
