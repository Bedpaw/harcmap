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
      $unwind: '$userEvents',
    }, {
      $lookup: {
        from: 'events',
        localField: 'userEvents.eventId',
        foreignField: '_id',
        as: 'event',
      },
    }, {
      $unwind: '$event',
    }, {
      $lookup: {
        from: 'teams',
        localField: 'userEvents.teamId',
        foreignField: '_id',
        as: 'team',
      },
    }, {
      $unwind: '$team',
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
            eventId: '$event._id',
            eventName: '$event.eventName',
            teamId: '$team._id',
            teamName: '$team.teamName',
            role: '$userEvents.role',
            isBanned: '$userEvents.isBanned',
          },
        },
      },
    },
  ];
}

module.exports = getUserAggregation;
