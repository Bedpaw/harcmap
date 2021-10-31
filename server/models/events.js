const Model = require('../libs/model');
const {
  eventName,
  date,
  defaultMapZoom,
  mapCoordinates,
  mapRefreshTime,
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
    longitude: mapCoordinates,
    latitude: mapCoordinates,
  },
  eventRefreshTime: mapRefreshTime,
};

// Create model
const Events = new Model('events', eventSchema);

module.exports = Events;
