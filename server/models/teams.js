const {
  objectIdInDatabase,
  teamName,
  collectedPoints,
} = require('../libs/common-schemas');
const Model = require('../libs/model');

// User schema
const userSchema = {
  eventId: objectIdInDatabase,
  teamName,
  collectedPoints,
};

// Create model
const Teams = new Model('teams', userSchema);

module.exports = Teams;
