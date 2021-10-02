const Joi = require('joi');

/**
 * This are commons schema fields used in all over application
 */
// TODO  big letter
const password = Joi.string()
  .min(8)
  .max(24);

const email = Joi.string()
  .email()
  .max(24);

const role = Joi.string()
  .equal('common', 'moderator', 'creator');

const eventName = Joi.string()
  .min(3)
  .max(50);

const eventKey = Joi.string()
  .length(4);

// TODO zmienić na datę
const date = Joi.number();

const eventDurationDate = date.allow(null);

const defaultMapZoom = Joi.number();
const mapCoordinate = Joi.number();
const mapRefreshTime = Joi.number();

module.exports = {
  email,
  password,
  role,
  eventName,
  eventKey,
  date,
  defaultMapZoom,
  mapRefreshTime,
  mapCoordinate,
  eventDurationDate,
};
