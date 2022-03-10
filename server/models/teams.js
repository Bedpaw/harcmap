const {
  objectIdInDatabase,
  teamName,
  color,
  collectedPoints,
} = require('../libs/common-schemas');
const Model = require('../libs/model');
const { errorCodes } = require('../libs/errors');

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
  uniqueFieldError: errorCodes.THIS_TEAMNAME_ALREADY_EXIST,
});

module.exports = Teams;
