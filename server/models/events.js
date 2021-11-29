const Model = require('../libs/model');
const {
  eventName,
  date,
  defaultMapZoom,
  longitude,
  latitude,
  eventRefreshTime,
} = require('../libs/common-schemas');

// event schema
const eventSchema = {
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
};

// Create model
const Events = new Model('events', eventSchema);

module.exports = Events;
