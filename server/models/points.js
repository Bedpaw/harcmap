const {
  objectIdInDatabase,
  keys,
  pointName,
  pointType,
  dateWithNull,
  longitude,
  latitude,
  pointDescription,
  pointSuccessMessage,
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
    longitude,
    latitude,
  },
  pointDescription: pointDescription,
  pointSuccessMessage: pointSuccessMessage,
};

// Create model
const Points = new Model('points', userSchema);

module.exports = Points;
