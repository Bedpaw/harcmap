/**
 * @description Aggregation using in mongodb
 * (https://docs.mongodb.com/manual/reference/aggregation/)
 *
 * @param query {object} - Mongo query. Must point to one document in keys collection
 */
function getKeyAggregation (query) {
  return [
    {
      $match: query,
    }, {
      $lookup: {
        from: 'events',
        localField: 'eventId',
        foreignField: '_id',
        as: 'event',
      },
    }, {
      $unwind: {
        path: '$event',
        preserveNullAndEmptyArrays: true,
      },
    }, {
      $lookup: {
        from: 'teams',
        localField: 'teamId',
        foreignField: '_id',
        as: 'team',
      },
    }, {
      $unwind: {
        path: '$team',
        preserveNullAndEmptyArrays: true,
      },
    }, {
      $group: {
        _id: '$_id',
        key: {
          $first: '$key',
        },
        role: {
          $first: '$role',
        },
        teamId: {
          $first: '$teamId',
        },
        teamName: {
          $first: { $ifNull: ['$team.teamName', null] },
        },
        teamColor: {
          $first: { $ifNull: ['$team.teamColor', null] },
        },
        eventId: {
          $first: '$eventId',
        },
        eventName: {
          $first: '$event.eventName',
        },
        eventDuration: {
          $first: '$event.eventDuration',
        },
      },
    }, {
      $sort: {
        _id: 1,
      },
    },
  ];
}

module.exports = getKeyAggregation;
