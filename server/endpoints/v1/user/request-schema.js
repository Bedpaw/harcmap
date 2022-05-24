const Joi = require('joi');
const {
  email,
  password,
  objectIdInRequest,
  userEventsEdit,
} = require('../../../libs/common-schemas');

const update = {
  PUT: Joi.object({
    userId: objectIdInRequest.required(),
    email,
    oldPassword: password,
    newPassword: password,
    userEvents: userEventsEdit,
  }),
};

module.exports = update;
