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
const objectIdInRequest = Joi.string();
const objectIdInDatabase = Joi.object();

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
const role = Joi.string()
  .equal('creator', 'admin', 'teamLeader', 'teamMember');
const teamName = Joi.string();

/**
 * Teams props
 */
const collectedPoints = Joi.array();

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
const pointShape = Joi.string();
const categoryName = Joi.string();

module.exports = {
  objectIdInDatabase,
  objectIdInRequest,
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
  collectedPoints,
};
