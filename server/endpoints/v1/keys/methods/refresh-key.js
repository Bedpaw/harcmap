const Keys = require('../../../../models/keys');
const { ObjectId } = require('mongodb');
const {
  AppError,
  errorCodes,
} = require('../../../../libs/errors');
const getKeyAggregation = require('../../../../aggregations/get-key');
const { generateUniqueKey } = require('../../../../libs/utils');

async function refreshKey (eventId, keyId) {
  const keyObject = await Keys.get({ _id: ObjectId(keyId), eventId: ObjectId(eventId) }, {
    aggregationPipeline: getKeyAggregation,
  });

  if (!keyObject) {
    throw new AppError(errorCodes.KEY_WITH_THIS_ID_NOT_EXIST, {
      httpStatus: 400,
    });
  }

  const newKey = await generateUniqueKey(Keys, 'key');

  const updatedKey = await Keys.update({
    _id: ObjectId(keyId),
    eventId: ObjectId(eventId),
  }, {
    key: newKey,
  });

  if (!updatedKey.success) {
    throw new AppError(errorCodes.CANNOT_REFRESH_KEY, {
      httpStatus: 400,
    });
  }

  const {
    role,
    eventName,
    eventDuration,
    teamId,
    teamName,
    teamColor,
  } = keyObject;

  return {
    role,
    key: newKey,
    eventId,
    eventName,
    eventDuration,
    teamId,
    teamName,
    teamColor,
  };
}

module.exports = refreshKey;
