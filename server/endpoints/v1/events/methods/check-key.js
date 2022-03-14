const Keys = require('../../../../models/keys');
const getKeyAggregation = require('../../../../aggregations/get-key');
const Users = require('../../../../models/users');
const { ObjectId } = require('mongodb');
const getUserAggregation = require('../../../../aggregations/get-user');
const { checkIfGivenUserIdOwnToAuthorizedUser, checkIfKeyAndUserExist, checkIfUserAlreadyParticipleInEvent } = require('../../../../libs/utils');

// TODO secure from ddos, add captcha
async function checkKey (request, eventKey, userId) {
  const key = await Keys.get({ key: eventKey }, {
    aggregationPipeline: getKeyAggregation,
  });
  const user = await Users.get({ _id: ObjectId(userId) }, {
    aggregationPipeline: getUserAggregation,
  });

  // validate key and userId
  checkIfKeyAndUserExist(key, user);

  checkIfGivenUserIdOwnToAuthorizedUser(request.user, userId);

  const { userEvents } = user;
  const {
    role,
    eventId,
    eventName,
    eventDuration,
    teamId,
    teamName,
    teamColor,
  } = key;

  // check if user participle in key event
  checkIfUserAlreadyParticipleInEvent(userEvents, eventId);

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
