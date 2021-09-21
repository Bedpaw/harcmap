const Users = require('../../../../models/users');
const mongodb = require('../../../../libs/mongodb');

async function updateUser (id, userObject) {
  return await Users.update({ _id: mongodb.ObjectId(id) }, userObject);
}

module.exports = updateUser;
