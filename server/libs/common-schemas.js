const Joi = require('joi');

/**
 * This are commons schema fields used in all over application
 */
const username = Joi.string()
  .min(3)
  .max(24);
// TODO  big letter
const password = Joi.string()
  .min(8)
  .max(24);
const email = Joi.string()
  .email()
  .max(24);
const role = Joi.string()
  .equal('common', 'admin');

module.exports = {
  email,
  username,
  password,
  role,
};
