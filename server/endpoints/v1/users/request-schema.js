const Joi = require('joi');
const {
  email, username, password, role,
} = require('../../../libs/common-schemas');

// empty schema means that no data can be pass
const GET = Joi.object({});

// "required" method is necessary in most POST methods
const POST = Joi.object({
  email: email.required(),
  username: username.required(),
  password: password.required(),
  role: role.required(),
});

// put(update) data rather dont need to be "required"
const PUT = Joi.object({
  email,
  username,
  password,
  role,
});

// empty schema means that no data can be pass
const DELETE = Joi.object({});

const schema = {
  GET,
  POST,
  PUT,
  DELETE,
};

module.exports = schema;
