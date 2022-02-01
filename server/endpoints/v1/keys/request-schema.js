const Joi = require('joi');

const refresh = {
  POST: Joi.object({}),
};

module.exports = {
  refresh,
};
