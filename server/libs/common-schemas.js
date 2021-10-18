const Joi = require('joi');

/**
 * This are commons schema fields used in all over application
 */
/**
 * Universal props
 */
// TODO zmienić na datę
const date = Joi.number();
const eventKey = Joi.string()
  .length(4);
const mapCoordinates = Joi.number();
const objectId = Joi.string();

/**
 * Users props
 */
// TODO Password policy
const email = Joi.string()
  .email()
  .max(24);
const password = Joi.string()
  .min(8)
  .max(24);
// TODO update
const role = Joi.string()
  .equal('common', 'moderator', 'creator');
const teamName = Joi.string();

/**
 * Event props
 */
const eventName = Joi.string()
  .min(3)
  .max(50);
const eventRefreshTime = Joi.number();
const defaultMapZoom = Joi.number();
const mapRefreshTime = Joi.number();
const mapZoom = Joi.number();

/**
 * Points props
 */
const pointName = Joi.string();
const pointType = Joi.string();
const pointKey = Joi.string();

/**
 * Category props
 */
const pointValue = Joi.number();
const pointShape = Joi.number();
const categoryName = Joi.string();

module.exports = {
  objectId,
  email,
  password,
  role,
  eventName,
  eventKey,
  date,
  defaultMapZoom,
  mapRefreshTime,
  mapZoom,
  mapCoordinates,
  categoryName,
  pointValue,
  pointShape,
  eventRefreshTime,
  teamName,
  pointName,
  pointType,
  pointKey,
};
