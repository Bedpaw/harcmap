const { getSHA } = require('../../../../libs/utils');
const Users = require('../../../../models/users');

// registration
// todo check if doesnt exist
async function signUp(userObject) {
	const userObjectWithHash = userObject;

	userObjectWithHash.role = 'common';
	userObjectWithHash.password = getSHA(userObject.password);

	const result = await Users.create(userObject);

	return result;
}

module.exports = signUp;
