const Joi = require('joi');
const {
  pointName,
  pointType,
  pointDescription,
  pointSuccessMessage,
  dateWithNull,
  longitude,
  latitude,
  objectIdInRequest,
  keys,
} = require('../../../libs/common-schemas');

const onePoint = {
  PUT: Joi.object({
    pointName,
    pointType,
    pointDuration: {
      startDate: dateWithNull,
      endDate: dateWithNull,
    },
    pointPosition: {
      longitude,
      latitude,
    },
    pointCategoryId: objectIdInRequest,
    pointDescription: pointDescription,
    pointSuccessMessage: pointSuccessMessage,
  }),
  DELETE: Joi.object({}),
};

const collect = {
  POST: Joi.object({
    pointKey: keys.required(),
  }),
};

const allPoints = {
  GET: Joi.object({}),
  POST: Joi.object({
    pointName,
    pointType: pointType.required(),
    pointDuration: {
      startDate: dateWithNull.required(),
      endDate: dateWithNull.required(),
    },
    pointPosition: {
      longitude: longitude.required(),
      latitude: latitude.required(),
    },
    pointCategoryId: objectIdInRequest.required(),
    pointDescription: pointDescription,
    pointSuccessMessage: pointSuccessMessage,
  }),
};

module.exports = {
  allPoints,
  onePoint,
  collect,
};
