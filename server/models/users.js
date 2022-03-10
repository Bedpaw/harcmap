const Joi = require('joi');
const { errorCodes } = require('../libs/errors');
const {
  email,
  date,
} = require('../libs/common-schemas');
const Model = require('../libs/model');

// User schema
const userSchema = {
  email,
  password: Joi.string(),
  accountActivation: {
    isActive: Joi.boolean(),
    key: Joi.string().allow(null),
  },
  passwordReset: {
    key: Joi.string().allow(null),
    date: date.allow(null),
  },
  accountCreated: date,
  userEvents: Joi.array(),
};

// Create model
const Users = new Model('users', userSchema, {
  uniqueFiled: 'email',
  uniqueFieldError: errorCodes.THIS_EMAIL_ALREADY_EXIST,
});

module.exports = Users;
