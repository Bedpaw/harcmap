const { getSHA } = require('../../../../libs/utils');
const Users = require('../../../../models/users');

async function addUser(userObject) {
	const userObjectWithHash = userObject;
	userObjectWithHash.password = getSHA(userObjectWithHash.password);

	const result = await Users.create(userObject);

	return result;
}

module.exports = addUser;
