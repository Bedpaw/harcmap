const {
  objectIdInDatabase,
  teamName,
  color,
  collectedPoints,
} = require('../libs/common-schemas');
const Model = require('../libs/model');

// Model schema
const modelSchema = {
  eventId: objectIdInDatabase,
  teamName,
  teamColor: color,
  collectedPoints,
};

// Create model
const Teams = new Model('teams', modelSchema, {
  uniqueFiled: 'teamName',
});

module.exports = Teams;
