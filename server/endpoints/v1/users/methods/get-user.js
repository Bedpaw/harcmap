const Users = require('../../../../models/users');
const getUserAggregation = require('../../../../aggregations/get-user');
const { ObjectId } = require('mongodb');

async function getUser (id) {
  const user = await Users.get({ _id: ObjectId(id) }, {
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
