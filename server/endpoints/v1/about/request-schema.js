const Joi = require('joi');

// empty schema means that no data can be pass
const GET = Joi.object({});

const schema = {
  GET,
};

module.exports = schema;
