const {
  objectIdInDatabase,
  categoryName,
  pointValue,
  color,
} = require('../libs/common-schemas');
const Model = require('../libs/model');

// User schema
const userSchema = {
  eventId: objectIdInDatabase,
  categoryName,
  pointValue,
  pointStrokeColor: color,
  pointFillColor: color,
};

// Create model
const Categories = new Model('categories', userSchema);

module.exports = Categories;
