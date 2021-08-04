const Users = require('../../../../models/users');

async function getUsers() {
	const usersArray = await Users.all();

	// filter passwords
	const usersArrayWithoutPasswords = usersArray.map((userObject) => {
		const userWithoutPassword = userObject;
		delete userWithoutPassword.password;
		return userWithoutPassword;
	});

	return usersArrayWithoutPasswords;
}

module.exports = getUsers;
