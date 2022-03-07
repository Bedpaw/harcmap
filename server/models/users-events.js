const Joi = require('joi');

const {
  objectIdInDatabase,
  keysRole,
  nickname,
} = require('../libs/common-schemas');
const Model = require('../libs/model');

// Model schema
const modelSchema = {
  eventId: objectIdInDatabase,
  teamId: Joi.object().allow(null),
  role: keysRole,
  nickname,
  isBanned: Joi.boolean(),
};

// Create model
const UsersEvents = new Model('usersEvents', modelSchema);

module.exports = UsersEvents;
