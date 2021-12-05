const Joi = require('joi');

/**
 * This are commons schema fields used in all over application
 */
/**
 * Universal props
 */
const date = Joi.number()
  .integer()
  .unsafe() // Date.now() max value is greater then js MAX_SAFE_INTEGER
  .max(8640000000000000); // that's the max value of Date.now()
const dateWithNull = date.allow(null);
const keys = Joi.string()
  .pattern(/^[ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789]{4}$/); // all characters except [O0Il]
const longitude = Joi.number()
  .min(-180)
  .max(180);
const latitude = Joi.number()
  .min(-90)
  .max(90);
const objectIdInRequest = Joi.string()
  .pattern(/^[a-fA-F0-9]{24}$/); // 24 character long hexadecimal pattern
const objectIdInDatabase = Joi.object();

/**
 * Users props
 */
const email = Joi.string()
  .email()
  .max(24)
  .trim();
const password = Joi.string()
  .pattern(/^(?=.*[0-9])(?=[a-z]*)(?=.*[A-Z]).{8,24}$/);
const role = Joi.string()
  .equal('creator', 'admin', 'teamLeader', 'teamMember');

/**
 * Teams props
 */
const teamName = Joi.string()
  .min(3)
  .max(24)
  .trim();
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

/**
 * Keys props
 */
const keysRole = Joi.string()
  .equal('teamMember', 'teamLeader', 'observer', 'admin', 'creator');

module.exports = {
  keys,
  objectIdInDatabase,
  objectIdInRequest,
  email,
  password,
  role,
  eventName,
  date,
  dateWithNull,
  defaultMapZoom,
  longitude,
  latitude,
  categoryName,
  pointValue,
  pointShape,
  eventRefreshTime,
  teamName,
  pointName,
  pointType,
  collectedPoints,
  keysRole,
};
