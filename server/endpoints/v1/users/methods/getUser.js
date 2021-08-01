const Users = require('../../../../models/users');
const mongodb = require('../../../../libs/mongodb');

async function getUser(id) {
	const user = await Users.get({ _id: mongodb.ObjectId(id) });

	return user;
}

module.exports = getUser;
