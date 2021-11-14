const Joi = require('joi');

/**
 * This are commons schema fields used in all over application
 */
/**
 * Universal props
 */
const objectIdPattern = '^[a-fA-F0-9]{24,24}$'; // 24 character long hexadecimal pattern
const keysPattern = '^[ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789]{4,4}$'; // except [O0Il] characters

const date = Joi.number()
  .integer()
  .unsafe() // Date.now() max value is greater then js MAX_SAFE_INTEGER
  .max(8640000000000000); // that's the max value of Date.now()
const keys = Joi.string()
  .pattern(new RegExp(keysPattern));
const mapCoordinates = Joi.object({
  longitude: Joi.number()
    .min(-180)
    .max(180)
    .required(),
  latitude: Joi.number()
    .min(-90)
    .max(90)
    .required(),
});
const objectIdInRequest = Joi.string()
  .pattern(new RegExp(objectIdPattern));
const objectIdInDatabase = Joi.object();

/**
 * Users props
 */
const passwordPattern = '^(?=.*[0-9])(?=[a-z]*)(?=.*[A-Z]).{8,24}$';

const email = Joi.string()
  .email()
  .max(24)
  .trim();
const password = Joi.string()
  .pattern(new RegExp(passwordPattern));
const role = Joi.string()
  .equal('creator', 'admin', 'teamLeader', 'teamMember');
const teamName = Joi.string()
  .min(3)
  .max(24)
  .trim();

/**
 * Teams props
 */
const collectedPoints = Joi.array()
  .items(objectIdInRequest);

/**
 * Event props
 */
const eventName = Joi.string()
  .min(3)
  .max(50);
const eventRefreshTime = Joi.number()
  .min(0)
  .less(10000000000);
const defaultMapZoom = Joi.number()
  .min(0)
  .less(10000000000);

/**
 * Points props
 */
const pointName = Joi.string()
  .min(3)
  .max(24)
  .trim();
const pointType = Joi.string()
  .equal('timeout', 'permanent');

/**
 * Category props
 */
const pointValue = Joi.number()
  .integer()
  .min(0)
  .max(9999999999);
const pointShape = Joi.string()
  .min(3)
  .max(24)
  .trim();
const categoryName = Joi.string()
  .min(3)
  .max(24)
  .trim();

module.exports = {
  keys,
  objectIdInDatabase,
  objectIdInRequest,
  email,
  password,
  role,
  eventName,
  date,
  defaultMapZoom,
  mapCoordinates,
  categoryName,
  pointValue,
  pointShape,
  eventRefreshTime,
  teamName,
  pointName,
  pointType,
  collectedPoints,
};
