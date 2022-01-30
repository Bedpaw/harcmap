const Events = require('../../../../models/events');
const { ObjectId } = require('mongodb');
const aggregationPipeline = require('../../../../aggregations/get-event');
const { secureField } = require('../../../../libs/utils');

async function getEvent (eventId, request) {
  const event = await Events.get({ _id: ObjectId(eventId) }, {
    aggregationPipeline,
  });
  const {
    eventName,
    eventDuration,
    mapProperties,
    eventRefreshTime,
    inviteKeys,
  } = event;
  const parsedInviteKeys = inviteKeys.map(key => ({
    ...key,
    keyId: key.keyId.toString(),
    teamId: key.teamId ? key.teamId.toString() : null,
  }));

  return {
    eventName,
    eventDuration,
    mapProperties,
    eventRefreshTime,
    inviteKeys: secureField(parsedInviteKeys, eventId, request),
  };
}

module.exports = getEvent;
