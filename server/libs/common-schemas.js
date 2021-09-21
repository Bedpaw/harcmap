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

const eventRole = Joi.string()
  .equal('common', 'moderator', 'creator');

const teamRole = Joi.string()
  .equal('common', 'leader');

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
  eventRole,
  eventName,
  eventKey,
  teamRole,
  date,
  defaultMapZoom,
  mapRefreshTime,
  mapCoordinate,
  eventDurationDate,
};
