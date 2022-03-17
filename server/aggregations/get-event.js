/**
 * @description Aggregation using in mongodb
 * (https://docs.mongodb.com/manual/reference/aggregation/)
 *
 * getEvent - using to get event data with related keys
 *
 * @param query {object} - Mongo query. Must point to one document in users collection
 */
function getEventsAggregation (query) {
  return [{
    $match: query,
  }, {
    $lookup: {
      from: 'keys',
      localField: '_id',
      foreignField: 'eventId',
      as: 'inviteKeys',
    },
  }, {
    $unwind: '$inviteKeys',
  }, {
    $group: {
      _id: '$_id',
      eventName: {
        $first: '$eventName',
      },
      eventDuration: {
        $first: '$eventDuration',
      },
      mapProperties: {
        $first: '$mapProperties',
      },
      eventRefreshTime: {
        $first: '$eventRefreshTime',
      },
      eventSettings: {
        $first: '$eventSettings',
      },
      inviteKeys: {
        $push: {
          keyId: '$inviteKeys._id',
          role: '$inviteKeys.role',
          key: '$inviteKeys.key',
          teamId: '$inviteKeys.teamId',
        },
      },
    },
  }, {
    $sort: {
      _id: 1,
    },
  }];
}

module.exports = getEventsAggregation;
