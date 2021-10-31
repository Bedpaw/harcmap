// available levels of access
const users = {
  creator: 'creator',
  admin: 'admin',
  leader: 'teamLeader',
  members: 'teamMember',
  // all registered users
  authenticated: 'authenticated',
  // open for all - DONT REQUIRE AUTHORIZATION
  all: 'all',
};

// map can contain array of permission users
// each endpoint require one(OR) of permission user not both or all(AND)
const endpointsAccessConfig = {
  // common endpoints
  '/about': users.all,
  '/api-docs': users.all,
  // auth endpoints
  '/api/v1/auth/sign-in': users.all,
  '/api/v1/auth/sign-up': users.all,
  '/api/v1/auth/sign-out': users.all,
  // users endpoints
  '/api/v1/users': [users.creator, users.admin],
  '/api/v1/users/:userId': [users.creator, users.admin],
  // events endpoints
  '/api/v1/events': [users.authenticated],
  '/api/v1/events/:eventId': [users.creator, users.admin],
  '/api/v1/events/:eventId/categories': [users.creator, users.admin],
  '/api/v1/events/:eventId/teams': [users.creator, users.admin],
  '/api/v1/events/:eventId/teams/:teamId': [users.creator, users.admin],
};

module.exports = endpointsAccessConfig;
