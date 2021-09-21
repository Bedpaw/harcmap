const Users = require('../../../../models/users');
const mongodb = require('../../../../libs/mongodb');

async function getUser (id) {
  return await Users.delete({ _id: mongodb.ObjectId(id) });
}

module.exports = getUser;
