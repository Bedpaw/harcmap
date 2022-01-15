const Joi = require('joi');
const {
  pointName,
  pointType,
  date,
  dateWithNull,
  longitude,
  latitude,
  objectIdInRequest,
  keys,
} = require('../../../libs/common-schemas');

const onePoint = {
  PUT: Joi.object({
    pointName: pointName,
    pointType: pointType,
    pointDuration: {
      startDate: dateWithNull,
      endDate: dateWithNull,
    },
    pointPosition: {
      longitude,
      latitude,
    },
    pointCategoryId: objectIdInRequest,
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
  }),
};

module.exports = {
  allPoints,
  onePoint,
  collect,
};
