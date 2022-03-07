const {
  AppError,
  errorCodes,
} = require('../errors');

// TODO check if team doesnt exist

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
  const userParticipleInThisEvent = userEvents.find(userEvent => {
    const eventId = userEvent.eventId;
    return eventId ? eventId.toString() === stringifyEventId : false;
  });
  if (userParticipleInThisEvent) {
    const { teamName, role } = userParticipleInThisEvent;
    throw new AppError(errorCodes.USER_ALREADY_PARTICIPLE_IN_THIS_EVENT, {
      httpStatus: 400,
      details: { teamName, role },
    });
  }
}

module.exports = {
  checkIfGivenUserIdOwnToAuthorizedUser,
  checkIfKeyAndUserExist,
  checkIfUserAlreadyParticipleInEvent,
};
