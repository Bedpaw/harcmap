const { ObjectId } = require('mongodb');

/**
 * @description Aggregation using in mongodb
 * (https://docs.mongodb.com/manual/reference/aggregation/)
 *
 * getUser - using to get user data with related events and teams
 *
 * @param query {object} - Mongo query. Must point to one document in users collection
 */
function getUserAggregation (query) {
  return [
    {
      $match: query,
    }, {
      $lookup: {
        from: 'usersEvents',
        localField: 'userEvents',
        foreignField: '_id',
        as: 'userEvents',
      },
    }, {
      $unwind: {
        path: '$userEvents',
        preserveNullAndEmptyArrays: true,
      },
    }, {
      $lookup: {
        from: 'events',
        localField: 'userEvents.eventId',
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
        localField: 'userEvents.teamId',
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
        email: {
          $first: '$email',
        },
        password: {
          $first: '$password',
        },
        accountActivation: {
          $first: '$accountActivation',
        },
        userEvents: {
          $push: {
            eventId: '$event._id',
            eventName: '$event.eventName',
            eventDuration: '$event.eventDuration',
            teamId: { $ifNull: ['$team._id', null] },
            teamName: { $ifNull: ['$team.teamName', null] },
            role: '$userEvents.role',
            isBanned: '$userEvents.isBanned',
          },
        },
      },
    }, {
      $sort: {
        _id: 1,
      },
    },
  ];
}

module.exports = getUserAggregation;
