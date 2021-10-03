const Users = require('../../../../models/users');
const getUserAggregation = require('../../../../aggregations/get-user');
const mongodb = require('../../../../libs/mongodb');

async function getUser (id) {
  const user = await Users.get({ _id: mongodb.ObjectId(id) }, {
    aggregationPipeline: getUserAggregation,
  });
  const {
    email,
    userEvents,
  } = user;

  return {
    email,
    userEvents,
  };
}

module.exports = getUser;
