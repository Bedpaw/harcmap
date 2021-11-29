const { ObjectId } = require('mongodb');
const UsersEvents = require('../../../../models/users-events');
const Keys = require('../../../../models/keys');
const Users = require('../../../../models/users');
const Teams = require('../../../../models/teams');
const getUserAggregation = require('../../../../aggregations/get-user');
const { AppError, errorCodes } = require('../../../../libs/errors');

function checkIfGivenUserIdOwnToAuthorizedUser (sessionData, requestedUserId) {
  if (!sessionData || (sessionData && sessionData._id !== requestedUserId)) {
    throw new AppError(errorCodes.THIS_USER_ID_DOESNT_BELONG_TO_YOU, {
      httpStatus: 400,
    });
  }
}

function checkIfKeyAndUserExist (key, user) {
  if (!key || !user) {
    throw new AppError(errorCodes.KEY_OR_USER_NOT_EXIST, {
      httpStatus: 400,
      details: {
        key: key ? 'exist' : 'not exist',
        user: user ? 'exist' : 'not exist',
      },
    });
  }
}

function checkIfUserAlreadyParticipleInEvent (userEvents, eventId) {
  const stringifyEventId = eventId.toString();
  const userParticipleInThisEvent = userEvents.find(userEvent => userEvent.eventId.toString() === stringifyEventId);
  if (userParticipleInThisEvent) {
    const { teamName, role } = userParticipleInThisEvent;
    throw new AppError(errorCodes.USER_ALREADY_PARTICIPLE_IN_THIS_EVENT, {
      httpStatus: 400,
      details: { teamName, role },
    });
  }
}

// TODO secure from ddos, add captcha
// TODO upgrade permission after give new code
async function joinEvent (request, userId, eventKey, teamName) {
  const key = await Keys.get({ key: eventKey });
  const user = await Users.get({ _id: ObjectId(userId) }, {
    aggregationPipeline: getUserAggregation,
  });

  // validate key and userId
  checkIfKeyAndUserExist(key, user);

  checkIfGivenUserIdOwnToAuthorizedUser(request.user, userId);

  const { eventId, teamId, role } = key;
  const { userEvents } = user;

  // check if user participle in key event
  checkIfUserAlreadyParticipleInEvent(userEvents, eventId);

  // creating team if role is teamLeader
  let team;
  if (role === 'teamLeader') {
    if (!teamName) {
      throw new AppError(errorCodes.REQUIRE_TEAMNAME, {
        httpStatus: 400,
      });
    }

    team = await Teams.create({
      eventId,
      teamName,
      collectedPoints: [],
    });

    if (!team.success) {
      throw new AppError(errorCodes.CANNOT_CREATE_TEAM, {
        httpStatus: 500,
        details: team.errorDetails,
      });
    }
  }

  // create new userEvent document
  const newUserEvent = await UsersEvents.create({
    eventId,
    teamId: teamId || team.data._id,
    role,
    isBanned: false,
  });

  if (!newUserEvent.success) {
    throw new AppError(errorCodes.CANNOT_CREATE_USEREVENTS_DOCUMENT, {
      httpStatus: 500,
      details: newUserEvent.errorDetails,
    });
  }

  // update user with new event data
  const updatedUser = await Users.update({ _id: user._id }, {
    $push: { userEvents: newUserEvent.data._id },
  }, { rawNewDocument: true });

  if (!updatedUser.success) {
    throw new AppError(errorCodes.CANNOT_UPDATE_USER_EVENTS, {
      httpStatus: 500,
      details: updatedUser.errorDetails,
    });
  }

  return updatedUser;
}

module.exports = joinEvent;
