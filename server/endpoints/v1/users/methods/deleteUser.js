const Users = require('../../../../models/users');
const mongodb = require('../../../../libs/mongodb');

async function getUser(id) {
	const result = await Users.delete({ _id: mongodb.ObjectId(id) });

	return result;
}

module.exports = getUser;
