// available levels of access
const users = {
  creator: 'creator',
  admin: 'admin',
  observer: 'observer',
  leader: 'teamLeader',
  member: 'teamMember',
  // all registered users
  authenticated: 'authenticated',
  // open for all - DONT REQUIRE AUTHORIZATION
  guest: 'guest',
};
const admins = [users.creator, users.admin, users.observer];
// all users permissions are difference from "user.authenticated"
// because in authenticated type, dynamic parts of url are not checking
// by security system
const allUsers = admins.concat([users.leader, users.member]);

// map can contain array of permission users
// each endpoint require one(OR) of permission user not both or all(AND)
//
// WARNING! ORDER HAVE MATTERS
//
const endpointsAccessConfig = {
  // common endpoints
  '/api-docs': users.guest,
  '/api/v1/about': users.guest,
  // auth endpoints
  '/api/v1/auth/sign-in': users.guest,
  '/api/v1/auth/sign-up': users.guest,
  '/api/v1/auth/sign-out': users.guest,
  // users endpoints
  '/api/v1/users': admins,
  '/api/v1/users/:userId': admins,
  '/api/v1/users/account-activation/:key': {
    GET: users.guest,
  },
  '/api/v1/users/reset-password': {
    POST: users.guest,
  },
  '/api/v1/users/reset-password/:key': {
    POST: users.guest,
  },
  // events endpoints
  '/api/v1/events': users.authenticated,
  '/api/v1/events/:eventId': admins,
  '/api/v1/events/check': users.authenticated,
  '/api/v1/events/join': users.authenticated,
  // categories
  '/api/v1/events/:eventId/categories': admins,
  // teams
  '/api/v1/events/:eventId/teams': admins,
  '/api/v1/events/:eventId/teams/:teamId': allUsers,
  // points
  '/api/v1/events/:eventId/points': {
    GET: allUsers,
    POST: admins,
  },
  '/api/v1/events/:eventId/points/:pointId': admins,
  '/api/v1/events/:eventId/points/collect': [users.creator, users.admin, users.observer, users.leader],
};

module.exports = endpointsAccessConfig;
