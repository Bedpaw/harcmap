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

  let emailToChange = false;

  if (newEmail) {
    if (userPassword !== getSHA(oldPassword)) {
      throw new AppError(errorCodes.PASSWORDS_DO_NOT_MATCH, {
        httpStatus: 400,
      });
    }
    emailToChange = true;
  }

  // checks if user wants to change password
  let passwordToChange = false;
  let newPasswordHash;

  // TODO change eventId from usereventId to real eventId

  if (newPassword) {
    newPasswordHash = getSHA(newPassword);
    if (userPassword !== getSHA(oldPassword)) {
      throw new AppError(errorCodes.PASSWORDS_DO_NOT_MATCH, {
        httpStatus: 400,
      });
    } else if (userPassword === newPasswordHash) {
      throw new AppError(errorCodes.OLD_AND_NEW_PASSWORD_ARE_EQUAL, {
        httpStatus: 400,
      });
    }
    passwordToChange = true;
  }

  // checks if user has joined to any event
  const isUserEventsExist = (allUserEvents.length === 1 && !allUserEvents[0].eventId) || !userEvents;

  if (!isUserEventsExist) {
    let isAssigned;
    // checks if allUserEvents contains sent userEvents
    for (const event of userEvents) {
      isAssigned = false;
      const checkEvent = await UsersEvents.get({ _id: ObjectId(event.eventId) });

      for (let i = 0; i < userEvents.length; i++) {
        if (allUserEvents.length >= userEvents.length) {
          if (allUserEvents[i].eventId.toString() === checkEvent.eventId.toString()) {
            isAssigned = true;
            break;
          }
        }
      }
      if (!isAssigned) {
        throw new AppError(errorCodes.USER_DOES_NOT_BELONG_TO_SELECTED_EVENT, {
          httpStatus: 400,
        });
      }
    }

    await Promise.all(userEvents.map(async (event) => {
      await UsersEvents.update({ _id: ObjectId(event.eventId) }, {
        nickname: event.nickname,
      });
    }));
  }

  return await Users.update({ _id: ObjectId(userId) }, {
    email: emailToChange ? newEmail : oldEmail,
    password: passwordToChange ? newPasswordHash : userPassword,
  });
}

module.exports = editUser;
