const { ObjectId } = require('mongodb');
const Events = require('../../../../models/events');
const Users = require('../../../../models/users');
const Keys = require('../../../../models/keys');
const UsersEvents = require('../../../../models/users-events');
const {
  AppError,
  errorCodes,
} = require('../../../../libs/errors');

const { generateUniqueKey, checkIfGivenUserIdOwnToAuthorizedUser } = require('../../../../libs/utils');

async function createEvent (request, body) {
  const {
    eventName,
    eventDuration,
    mapProperties,
    eventRefreshTime,
    nickname,
    userId,
  } = body;

  checkIfGivenUserIdOwnToAuthorizedUser(request.user, userId);

  // TODO add createOne for one item
  const event = await Events.create({
    eventName,
    eventDuration,
    mapProperties,
    eventRefreshTime,
  });

  if (!event.success) {
    throw new AppError(errorCodes.CANNOT_CREATE_EVENT, {
      httpStatus: 500,
      details: event.errorDetails,
    });
  }

  const eventData = event.data[0];

  // create new userEvent document
  const newUserEvent = await UsersEvents.create({
    eventId: eventData._id,
    teamId: null,
    nickname,
    role: 'creator',
    isBanned: false,
  });

  if (!newUserEvent.success) {
    throw new AppError(errorCodes.CANNOT_CREATE_USEREVENTS_DOCUMENT, {
      httpStatus: 500,
      details: newUserEvent.errorDetails,
    });
  }

  // create new userEvent document
  const updatedUser = await Users.update({ _id: ObjectId(userId) }, {
    $push: { userEvents: newUserEvent.data[0]._id },
  }, { rawNewDocument: true });

  if (!updatedUser.success) {
    throw new AppError(errorCodes.CANNOT_UPDATE_USER_EVENTS, {
      httpStatus: 500,
      details: newUserEvent.errorDetails,
    });
  }

  // generate 3 types of codes
  const adminKey = await Keys.create({
    eventId: ObjectId(event.data[0]._id),
    teamId: null,
    key: await generateUniqueKey(Keys, 'key'),
    role: 'admin',
  });

  if (!adminKey.success) {
    throw new AppError(errorCodes.CANNOT_CREATE_ADMIN_KEY, {
      httpStatus: 500,
      details: adminKey.errorDetails,
    });
  }

  const observerKey = await Keys.create({
    eventId: ObjectId(event.data[0]._id),
    teamId: null,
    key: await generateUniqueKey(Keys, 'key'),
    role: 'observer',
  });

  if (!observerKey.success) {
    throw new AppError(errorCodes.CANNOT_CREATE_OBSERVER_KEY, {
      httpStatus: 500,
      details: observerKey.errorDetails,
    });
  }

  const teamLeaderKey = await Keys.create({
    eventId: ObjectId(event.data[0]._id),
    teamId: null,
    key: await generateUniqueKey(Keys, 'key'),
    role: 'teamLeader',
  });

  if (!teamLeaderKey.success) {
    throw new AppError(errorCodes.CANNOT_CREATE_OBSERVER_KEY, {
      httpStatus: 500,
      details: teamLeaderKey.errorDetails,
    });
  }

  const inviteKeysRaw = [adminKey.data[0], observerKey.data[0], teamLeaderKey.data[0]];
  const inviteKeys = inviteKeysRaw.map(keyObject => {
    const copyKeyObject = { ...keyObject };

    copyKeyObject.keyId = keyObject._id.toString();
    delete copyKeyObject._id;
    delete copyKeyObject.eventId;

    return copyKeyObject;
  });

  return {
    eventId: event.data[0]._id.toString(),
    eventName,
    eventDuration,
    mapProperties,
    eventRefreshTime,
    inviteKeys,
  };
}

module.exports = createEvent;
