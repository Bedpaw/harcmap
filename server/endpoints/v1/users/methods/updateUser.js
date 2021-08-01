const Users = require('../../../../models/users');
const mongodb = require('../../../../libs/mongodb');

async function addUser(id, userObject) {
	const result = await Users.update({ _id: mongodb.ObjectId(id) }, userObject);

	return result;
}

module.exports = addUser;
