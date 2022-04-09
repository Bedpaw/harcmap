const Users = require('../../../../models/users');
const UsersEvents = require('../../../../models/users-events');
const { checkIfGivenUserIdOwnToAuthorizedUser } = require('../../../../libs/utils');
const { ObjectId } = require('mongodb');
const getUserAggregation = require('../../../../aggregations/get-user');
const { AppError, errorCodes } = require('../../../../libs/errors');
const { getSHA } = require('../../../../libs/utils');

async function editUser (request, data) {
  const { email: newEmail, newPassword, oldPassword, userEvents, userId } = data;

  // check if userId equals SSID
  checkIfGivenUserIdOwnToAuthorizedUser(request.user, userId);

  const user = await Users.get({ _id: ObjectId(userId) }, {
    aggregationPipeline: getUserAggregation,
  });

  // fields from database
  const { email: oldEmail, password: userPassword, userEvents: allUserEvents } = user;

  // checks if user wants to change password
  let passwordToChange = false;
  if (newPassword) {
    if (userPassword !== getSHA(oldPassword)) {
      throw new AppError(errorCodes.CANNOT_UPDATE_USER_PASSWORD, {
        httpStatus: 400,
        details: 'passwords do not match',
      });
    } else if (userPassword === getSHA(newPassword)) {
      throw new AppError(errorCodes.CANNOT_UPDATE_USER_PASSWORD, {
        httpStatus: 400,
        details: 'old and new passwords are equal',
      });
    }
    passwordToChange = true;
  }

  // checks if user has joined to any event
  const noUserEvents = allUserEvents.length === 1 && !allUserEvents[0].eventId;

  if (!noUserEvents && userEvents) {
    let isAssigned;
    // checks if allUserEvents contains sent userEvents
    for (const event of userEvents) {
      isAssigned = false;
      const checkEvent = await UsersEvents.get({ _id: ObjectId(event.userEventId) });

      for (let i = 0; i < userEvents.length; i++) {
        if (allUserEvents.length >= userEvents.length) {
          if (allUserEvents[i].teamId == null && checkEvent.teamId == null) {
            isAssigned = true;
            break;
          }

          // resolves problem when teamId == null (can't do .toString() on null value)
          if (allUserEvents[i].teamId == null) allUserEvents[i].teamId = 'tempId';
          if (checkEvent.teamId == null) checkEvent.teamId = 'tempId';

          if (allUserEvents[i].teamId.toString() === checkEvent.teamId.toString() &&
              allUserEvents[i].eventId.toString() === checkEvent.eventId.toString()) {
            allUserEvents[i].teamId = null;
            isAssigned = true;
            break;
          }
        }
      }
      if (!isAssigned) {
        throw new AppError(errorCodes.CANNOT_UPDATE_USEREVENTS_NICKNAME, {
          httpStatus: 400,
          details: 'user is not assigned to at least one of the given events',
        });
      }
    }

    for (const event of userEvents) {
      await UsersEvents.update({ _id: ObjectId(event.userEventId) }, {
        nickname: event.nickname,
      });
    }
  }

  return await Users.update({ _id: ObjectId(userId) }, {
    email: newEmail || oldEmail,
    password: passwordToChange ? getSHA(newPassword) : userPassword,
  });
}

module.exports = editUser;
