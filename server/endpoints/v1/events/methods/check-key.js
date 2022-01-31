const Keys = require('../../../../models/keys');
const { AppError, errorCodes } = require('../../../../libs/errors');
const getKeyAggregation = require('../../../../aggregations/get-key');

// TODO secure from ddos, add captcha
async function checkKey (eventKey) {
  const key = await Keys.get({ key: eventKey }, {
    aggregationPipeline: getKeyAggregation,
  });

  // key not exist
  if (!key) {
    throw new AppError(errorCodes.KEY_NOT_EXIST, {
      httpStatus: 400,
    });
  }

  const {
    role,
    eventId,
    eventName,
    eventDuration,
    teamId,
    teamName,
    teamColor,
  } = key;

  return {
    role,
    eventId: eventId.toString(),
    eventName,
    eventDuration,
    teamId: teamId ? teamId.toString() : null,
    teamName,
    teamColor,
  };
}

module.exports = checkKey;
