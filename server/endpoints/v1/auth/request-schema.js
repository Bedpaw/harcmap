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
