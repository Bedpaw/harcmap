const Joi = require('joi');
const { errorCodes } = require('../libs/errors');

const {
  keys,
  keysRole,
} = require('../libs/common-schemas');
const Model = require('../libs/model');

// Model schema
const modelSchema = {
  key: keys,
  role: keysRole,
  eventId: Joi.object(),
  teamId: Joi.object().allow(null),
};

// Create model
const Keys = new Model('keys', modelSchema, {
  uniqueFiled: 'key',
  uniqueFieldError: errorCodes.THIS_KEY_ALREADY_EXIST,
});

module.exports = Keys;
