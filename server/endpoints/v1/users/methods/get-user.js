const Users = require('../../../../models/users');
const getUserAggregation = require('../../../../aggregations/get-user');
const { ObjectId } = require('mongodb');

async function getUser (id) {
  const user = await Users.get({ _id: ObjectId(id) }, {
    aggregationPipeline: getUserAggregation,
  });
  const { email, userEvents } = user;
  const noUserEvents = userEvents.length === 1 && !userEvents[0].eventId;

  return {
    email,
    userEvents: noUserEvents ? [] : userEvents,
  };
}

module.exports = getUser;

// TODO: 2 endpointy: check i join
