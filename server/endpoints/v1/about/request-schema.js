const Joi = require('joi');

// empty schema means that no data can be pass
const schema = {
  GET: Joi.object({}),
};

module.exports = schema;
