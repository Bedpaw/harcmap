const Joi = require('joi');
const {
  email,
  role,
  objectIdInRequest,
} = require('../../../libs/common-schemas');

// empty schema means that no data can be pass
const GET = Joi.object({
  eventId: objectIdInRequest.required(),
});

// "required" method is necessary in most POST methods
const POST = Joi.object({
  email: email.required(),
  role: role.required(),
});

// put(update) data rather dont need to be "required"
const PUT = Joi.object({
  email,
  role,
});

// empty schema means that no data can be pass
const DELETE = Joi.object({});

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
