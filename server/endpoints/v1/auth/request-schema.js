const Joi = require('joi');
const {
  email,
  password,
} = require('../../../libs/common-schemas');

// login
const signInSchema = {
  POST: Joi.object({
    email: email.required(),
    password: password.required(),
  }),
  // login endpoint accept also empty object
  // TODO move this to method scope
  allowEmptyObject: true,
};

// logout
const signOutSchema = {
  POST: Joi.object({}),
};

// registration
const signUpSchema = {
  POST: Joi.object({
    email: email.required(),
    password: password.required(),
  }),
};

module.exports = {
  signInSchema,
  signUpSchema,
  signOutSchema,
};
