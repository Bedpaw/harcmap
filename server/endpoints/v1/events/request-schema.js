const Joi = require('joi');
const {
  objectIdInRequest,
  teamName,
  eventName,
  date,
  longitude,
  latitude,
  eventRefreshTime,
  defaultMapZoom,
  keys,
  color,
  nickname,
} = require('../../../libs/common-schemas');

// empty schema means that no data can be pass
const allEvents = {
  POST: Joi.object({
    eventName: eventName.required(),
    eventDuration: {
      startDate: date.required(),
      endDate: date.required(),
    },
    mapProperties: {
      zoom: defaultMapZoom.required(),
      longitude: longitude.required(),
      latitude: latitude.required(),
    },
    eventRefreshTime: eventRefreshTime.required(),
    nickname: nickname.required(),
    userId: objectIdInRequest.required(),
  }),
};

const oneEvent = {
  GET: Joi.object({}),
  PUT: Joi.object({
    eventName,
    eventDuration: {
      startDate: date,
      endDate: date,
    },
    mapProperties: {
      zoom: defaultMapZoom,
      longitude,
      latitude,
    },
    eventRefreshTime,
  }),
};

const check = {
  POST: Joi.object({
    userId: objectIdInRequest.required(),
    eventKey: keys.required(),
  }),
};

const join = {
  POST: Joi.object({
    userId: objectIdInRequest.required(),
    eventKey: keys.required(),
    nickname: nickname.required(),
    teamColor: color,
    teamName,
  }),
};

module.exports = {
  allEvents,
  oneEvent,
  check,
  join,
};
