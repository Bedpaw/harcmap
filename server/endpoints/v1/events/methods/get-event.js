const Events = require('../../../../models/events');
const { ObjectId } = require('mongodb');
const aggregationPipeline = require('../../../../aggregations/get-event');

async function getEvent (id) {
  const event = await Events.get({ _id: ObjectId(id) }, {
    aggregationPipeline,
  });
  const {
    eventName,
    eventDuration,
    mapProperties,
    eventRefreshTime,
    inviteKeys,
  } = event;

  return {
    eventName,
    eventDuration,
    mapProperties,
    eventRefreshTime,
    inviteKeys: inviteKeys.map(key => ({ ...key, keyId: key.keyId.toString() })),
  };
}

module.exports = getEvent;
