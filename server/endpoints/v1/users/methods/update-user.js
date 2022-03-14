const Users = require('../../../../models/users');
const { ObjectId } = require('mongodb');

async function updateUser (id, userObject) {
  return { success: true };
}

module.exports = updateUser;
