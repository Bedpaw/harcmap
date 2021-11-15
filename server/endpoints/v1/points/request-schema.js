const Joi = require('joi');
const {
  pointName,
  pointType,
  date,
  mapCoordinates,
  objectIdInRequest,
  keys,
} = require('../../../libs/common-schemas');

const onePoint = {
  PUT: Joi.object({
    pointName: pointName,
    pointType: pointType,
    pointDuration: {
      startDate: date,
      endDate: date,
    },
    pointPosition: {
      longitude: mapCoordinates,
      latitude: mapCoordinates,
    },
    pointCategoryId: objectIdInRequest,
  }),
  DELETE: Joi.object({}),
};

const collectPoint = {
  POST: Joi.object({
    pointKey: keys.required(),
  }),
};

const allPoints = {
  GET: Joi.object({}),
  POST: Joi.object({
    pointName: pointName.required(),
    pointType: pointType.required(),
    pointDuration: {
      startDate: date.required(),
      endDate: date.required(),
    },
    pointPosition: {
      longitude: mapCoordinates.required(),
      latitude: mapCoordinates.required(),
    },
    pointCategoryId: objectIdInRequest.required(),
  }),
};

module.exports = {
  allPoints,
  onePoint,
  collectPoint,
};
