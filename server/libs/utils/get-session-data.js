const { ObjectId } = require('mongodb');

/**
 * @description Method used to get event data of authenticated user
 * for given eventId
 * @param eventId {String} - id of event with role we're searching
 * @param sessionData {object} - "request.user" object
 * @return {Object}
 */
function getUserDataFromSession (eventId, sessionData) {
  const { userEvents } = sessionData || { userEvents: [] };
  const actualEvent = userEvents.find(userEvent => {
    const objectIdString = userEvent.eventId ? userEvent.eventId.toString() : '';

    return eventId === objectIdString;
  });

  return actualEvent || {};
}

/**
 * @description Method used to get role of authenticated user
 * for given eventId
 * @param eventId {String} - id of event with role we're searching
 * @param sessionData {object} - "request.user" object
 * @return {String|null}
 */
function getUserRoleFromSession (eventId, sessionData) {
  return getUserDataFromSession(eventId, sessionData).role || null;
}

/**
 * @description Method used to get teamId of authenticated user
 * for given eventId
 * @param eventId {String} - id of event with role we're searching
 * @param sessionData {object} - "request.user" object
 * @return {String|null}
 */
function getUserTeamIdFromSession (eventId, sessionData) {
  const teamIdObject = getUserDataFromSession(eventId, sessionData).teamId;
  let teamIdString = null;

  if (teamIdObject)
    teamIdString = ObjectId(teamIdObject);

  return teamIdString;
}

module.exports = {
  getUserRoleFromSession,
  getUserTeamIdFromSession,
};
