const Joi = require('joi');

const {
  email,
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
    date: Joi.number().allow(null),
  },
  accountCreated: Joi.number(),
  userEvents: Joi.array(),
};

// Create model
const Users = new Model('users', userSchema);

module.exports = Users;
