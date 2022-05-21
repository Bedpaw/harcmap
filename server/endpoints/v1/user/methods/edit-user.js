const Users = require('../../../../models/users');
const UsersEvents = require('../../../../models/users-events');
const { checkIfGivenUserIdOwnToAuthorizedUser } = require('../../../../libs/utils');
const { ObjectId } = require('mongodb');
const getUserEventsAggregation = require('../../../../aggregations/get-user-events');
const { AppError, errorCodes } = require('../../../../libs/errors');
const { getSHA } = require('../../../../libs/utils');

async function editUser (request, data) {
  const { email: newEmail, newPassword, oldPassword, userEvents: receivedUserEvents, userId } = data;

  // check if userId equals SSID
  checkIfGivenUserIdOwnToAuthorizedUser(request.user, userId);

  const user = await Users.get({ _id: ObjectId(userId) }, {
    aggregationPipeline: getUserEventsAggregation,
  });

  // fields from database
  const { email: oldEmail, password: userPassword, userEvents: allUserEvents } = user;

  let emailToChange = false;

  if (newEmail && oldPassword) {
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

  if (newPassword && oldPassword) {
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
  const isUserEventsExist = (allUserEvents.length === 1 && !allUserEvents[0].eventId) || !receivedUserEvents;

  if (!isUserEventsExist) {

    // create array of objects (userEventId, nickname) from given eventId's
    const userEventsData = [];

    for (const received of receivedUserEvents) {
      let isAssigned = false;

      for (const userEvent of allUserEvents) {
        if (userEvent.eventId.toString() === received.eventId) {
          const eventToChange = {
            userEventId: userEvent.userEventsId,
            nickname: received.nickname,
          };
          userEventsData.push(eventToChange);
          isAssigned = true;

          break;
        }
      }
      if (!isAssigned) {
        throw new AppError(errorCodes.USER_DOES_NOT_BELONG_TO_SELECTED_EVENT, {
          httpStatus: 400,
        });
      }
    }

    await Promise.all(userEventsData.map(async (event) => {
      await UsersEvents.update({ _id: ObjectId(event.userEventId) }, {
        nickname: event.nickname,
      });
    }));
  }

  const newUserData = {};

  if (emailToChange) {
    newUserData.email = newEmail;
  }

  if (passwordToChange) {
    newUserData.password = newPasswordHash;
  }

  return await Users.update({ _id: ObjectId(userId) }, newUserData);
}

module.exports = editUser;
