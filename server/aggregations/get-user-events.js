const { ObjectId } = require('mongodb');

/**
 * @description Aggregation using in mongodb
 * (https://docs.mongodb.com/manual/reference/aggregation/)
 *
 * getUserEvents - using to get user data with related events
 *
 * @param query {object} - Mongo query. Must point to one document in users collection
 */
function getUserEventsAggregation (query) {
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
      $group: {
        _id: '$_id',
        email: {
          $first: '$email',
        },
        password: {
          $first: '$password',
        },
        userEvents: {
          $push: {
            userEventsId: '$userEvents._id',
            eventId: '$event._id',
            nickname: '$userEvents.nickname',
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

module.exports = getUserEventsAggregation;
