// available levels of access
const users = {
	// system admin
	admin: 'admin',
	// all registered users
	authenticated: 'authenticated',
	// logged user with access to his "_id" resources
	owner: (request) => request.user && request.params.id === request.user._id,
	// open for all - DONT REQUIRE AUTHORIZATION
	all: 'all',
};

// map can contain array of permission users
// each endpoint require one(OR) of permission user not both or all(AND)
const endpointsAccessConfig = {
	'/about': users.all,
	'/api/v1/users': users.admin,
	'/api/v1/users/:id': {
		GET: [users.admin, users.owner],
		PUT: [users.admin, users.owner],
		DELETE: users.admin,
	},
	'/api/v1/auth/sign-in': {
		POST: users.all,
	},
	'/api/v1/auth/sign-up': {
		POST: users.all,
	},
	'/api/v1/auth/sign-out': {
		POST: users.all,
	},
};

module.exports = endpointsAccessConfig;
