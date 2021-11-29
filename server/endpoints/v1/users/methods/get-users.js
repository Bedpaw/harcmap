const Users = require('../../../../models/users');
const { ObjectId } = require('mongodb');
const getUsersAggregation = require('../../../../aggregations/get-users');

async function getUsers (eventId) {
  const users = await Users.getMany({ 'event._id': ObjectId(eventId) }, {
    aggregationPipeline: getUsersAggregation,
  });

  const results = users.map(userObject => ({
    email: userObject.email,
    userEvents: userObject.userEvents,
  }));

  return results;
}

module.exports = getUsers;
