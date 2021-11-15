const {
  objectIdInDatabase,
  keys,
  pointName,
  pointType,
  dateWithNull,
  mapCoordinates,
} = require('../libs/common-schemas');
const Model = require('../libs/model');

// User schema
const userSchema = {
  eventId: objectIdInDatabase,
  pointKey: keys,
  pointName,
  pointType,
  pointCollectedDate: dateWithNull,
  pointCategoryId: objectIdInDatabase,
  pointDuration: {
    startDate: dateWithNull,
    endDate: dateWithNull,
  },
  pointPosition: {
    longitude: mapCoordinates,
    latitude: mapCoordinates,
  },
};

// Create model
const Points = new Model('points', userSchema);

module.exports = Points;
