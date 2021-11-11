const Joi = require('joi');
const {
  objectIdInRequest,
  teamName,
  eventName,
  date,
  mapCoordinates,
  eventRefreshTime,
  defaultMapZoom,
  keys,
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
      longitude: mapCoordinates.required(),
      latitude: mapCoordinates.required(),
    },
    eventRefreshTime: eventRefreshTime.required(),
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
      longitude: mapCoordinates,
      latitude: mapCoordinates,
    },
    eventRefreshTime,
  }),
};

const check = {
  POST: Joi.object({
    eventKey: keys.required(),
  }),
};

const join = {
  POST: Joi.object({
    userId: objectIdInRequest.required(),
    eventKey: keys.required(),
    teamName: teamName.required(),
  }),
};

module.exports = {
  allEvents,
  oneEvent,
  check,
  join,
};
