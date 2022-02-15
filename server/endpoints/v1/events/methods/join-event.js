const { ObjectId } = require('mongodb');
const UsersEvents = require('../../../../models/users-events');
const Keys = require('../../../../models/keys');
const Users = require('../../../../models/users');
const Teams = require('../../../../models/teams');
const getUserAggregation = require('../../../../aggregations/get-user');
const { AppError, errorCodes } = require('../../../../libs/errors');
const getKeyAggregation = require('../../../../aggregations/get-key');
const { checkIfGivenUserIdOwnToAuthorizedUser, checkIfKeyAndUserExist, checkIfUserAlreadyParticipleInEvent } = require('../../../../libs/utils');

// TODO secure from ddos, add captcha
// TODO upgrade permission after give new code
async function joinEvent (request, userId, eventKey, newTeamName) {
  const key = await Keys.get({ key: eventKey }, {
    aggregationPipeline: getKeyAggregation,
  });
  const user = await Users.get({ _id: ObjectId(userId) }, {
    aggregationPipeline: getUserAggregation,
  });

  // validate key and userId
  checkIfKeyAndUserExist(key, user);

  checkIfGivenUserIdOwnToAuthorizedUser(request.user, userId);

  const { eventId, teamId, role, eventName, eventDuration, teamName, teamColor } = key;
  const { userEvents } = user;

  // check if user participle in key event
  checkIfUserAlreadyParticipleInEvent(userEvents, eventId);

  // creating team if role is teamLeader
  let team;
  let newTeamId = teamId;
  if (role === 'teamLeader') {
    if (!newTeamName) {
      throw new AppError(errorCodes.REQUIRE_TEAMNAME, {
        httpStatus: 400,
      });
    }

    team = await Teams.create({
      eventId,
      teamName: newTeamName,
      collectedPoints: [],
    });

    if (!team.success) {
      throw new AppError(errorCodes.CANNOT_CREATE_TEAM, {
        httpStatus: 500,
        details: team.errorDetails,
      });
    }

    newTeamId = team.data[0]._id;
  }

  // create new userEvent document
  const newUserEvent = await UsersEvents.create({
    eventId,
    teamId: newTeamId || null,
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
    $push: { userEvents: newUserEvent.data[0]._id },
  }, { rawNewDocument: true });

  if (!updatedUser.success) {
    throw new AppError(errorCodes.CANNOT_UPDATE_USER_EVENTS, {
      httpStatus: 500,
      details: updatedUser.errorDetails,
    });
  }

  return {
    role,
    eventId: eventId.toString(),
    eventName,
    eventDuration,
    teamId: teamId ? teamId.toString() : null,
    teamName: teamName || null,
    teamColor: teamColor || null,
  };
}

module.exports = joinEvent;
