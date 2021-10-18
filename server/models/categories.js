const {
  objectId,
  categoryName,
  pointValue,
  pointShape,
} = require('../libs/common-schemas');
const Model = require('../libs/model');

// User schema
const userSchema = {
  eventId: objectId,
  categoryName,
  pointValue,
  pointShape,
};

// Create model
const Categories = new Model('categories', userSchema);

module.exports = Categories;
