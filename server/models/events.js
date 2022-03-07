const Model = require('../libs/model');
const { codes } = require('../libs/errors');
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
const Events = new Model('events', eventSchema, {
  uniqueFiled: 'eventName',
  uniqueFieldError: codes.THIS_EVENTNAME_ALREADY_EXIST,
});

module.exports = Events;
