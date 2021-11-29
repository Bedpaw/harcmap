const Keys = require('../../../../models/keys');
const { AppError, errorCodes } = require('../../../../libs/errors');

// TODO secure from ddos, add captcha
async function checkKey (eventKey) {
  const key = await Keys.get({ key: eventKey });

  // key not exist
  if (!key) {
    throw new AppError(errorCodes.KEY_NOT_EXIST, {
      httpStatus: 400,
    });
  }

  const {
    eventId,
    teamId,
    role,
  } = key;

  return {
    eventId: eventId.toString(),
    teamId: teamId.toString(),
    role,
  };
}

module.exports = checkKey;
