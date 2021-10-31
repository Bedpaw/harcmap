/**
 * @description Aggregation using in mongodb
 * (https://docs.mongodb.com/manual/reference/aggregation/)
 *
 * getTeams - using to get one/all teams with members
 *
 * @param query {object} - Mongo query. Must point to one document in users collection
 */
function getTeams (query) {
  return [{
    $match: query,
  }, {
    $lookup: {
      from: 'usersEvents',
      localField: '_id',
      foreignField: 'teamId',
      as: 'userEvents',
    },
  }, {
    $unwind: '$userEvents',
  }, {
    $lookup: {
      from: 'users',
      localField: 'userEvents._id',
      foreignField: 'userEvents',
      as: 'users',
    },
  }, {
    $unwind: '$users',
  }, {
    $group: {
      _id: '$_id',
      teamName: {
        $first: '$teamName',
      },
      collectedPoints: {
        $first: '$collectedPoints',
      },
      teamMembers: {
        $push: {
          userId: '$users._id',
          email: '$users.email',
          role: '$userEvents.role',
        },
      },
    },
  }, {
    $sort: {
      _id: 1,
    },
  }];
}

module.exports = getTeams;
