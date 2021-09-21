const Joi = require('joi');

const Model = require('../libs/model');
const {
  eventName,
  eventKey,
  eventDurationDate,
  defaultMapZoom,
  mapCoordinate,
  mapRefreshTime,
} = require('../libs/common-schemas');

// event schema
const eventSchema = {
  eventName,
  eventKey,
  pointsCollectionName: Joi.string(),
  categoriesCollectionName: Joi.string(),
  eventDuration: {
    startDate: eventDurationDate,
    endDate: eventDurationDate,
  },
  mapProperties: {
    zoom: defaultMapZoom,
    longitude: mapCoordinate,
    latitude: mapCoordinate,
  },
  eventRefreshTime: mapRefreshTime,
};

// Create model
const Events = new Model('events', eventSchema);

module.exports = Events;
