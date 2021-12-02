const Joi = require('joi');
const {
  objectIdInRequest,
  email,
  password,
} = require('../../../libs/common-schemas');

// /users/:userId
const userRequestSchema = {
  GET: Joi.object({}),
};

// /users
const usersRequestSchema = {
  GET: Joi.object({
    eventId: objectIdInRequest.required(),
  }),
};

const resetPasswordSchema = {
  POST: Joi.object({
    email,
  }),
};

const activateAccountSchema = {
  GET: Joi.object({}),
};

const resetPasswordKeySchema = {
  POST: Joi.object({
    password,
  }),
};

module.exports = {
  userRequestSchema,
  usersRequestSchema,
  resetPasswordSchema,
  activateAccountSchema,
  resetPasswordKeySchema,
};
