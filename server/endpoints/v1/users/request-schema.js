const Joi = require('joi');
const {
  objectIdInRequest,
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

module.exports = {
  userRequestSchema,
  usersRequestSchema,
};
