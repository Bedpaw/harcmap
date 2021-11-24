const Users = require('../../../../models/users');
const mongodb = require('../../../../libs/mongodb');
const getUsersAggregation = require('../../../../aggregations/get-users');

async function getUsers (eventId) {
  const users = await Users.getMany({ 'event._id': mongodb.ObjectId(eventId) }, {
    aggregationPipeline: getUsersAggregation,
  });

  const results = users.map(userObject => ({
    email: userObject.email,
    userEvents: userObject.userEvents,
  }));

  return results;
}

module.exports = getUsers;
