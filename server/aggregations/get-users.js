/**
 * @description Aggregation using in mongodb
 * getUsers - using to get users data with related events and teams
 *
 * @param query {object} - Mongo query. Must point to one document in users collection
 */
function getUsersAggregation (query) {
  return [
    {
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
      $match: query,
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
            eventDuration: '$event.eventDuration',
            teamId: '$team._id',
            teamName: '$team.teamName',
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

module.exports = getUsersAggregation;
