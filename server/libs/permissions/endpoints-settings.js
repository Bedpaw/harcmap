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

// map can contain array of permission users
// each endpoint require one(OR) of permission user not both or all(AND)
const endpointsAccessConfig = {
  // common endpoints
  '/about': users.guest,
  '/api-docs': users.guest,
  // auth endpoints
  '/api/v1/auth/sign-in': users.guest,
  '/api/v1/auth/sign-up': users.guest,
  '/api/v1/auth/sign-out': users.guest,
  // users endpoints
  '/api/v1/users': admins,
  '/api/v1/users/:userId': admins,
  // events endpoints
  '/api/v1/events': [users.authenticated],
  '/api/v1/events/:eventId': admins,
  // categories
  '/api/v1/events/:eventId/categories': admins,
  // teams
  '/api/v1/events/:eventId/teams': admins,
  '/api/v1/events/:eventId/teams/:teamId': [users.creator, users.admin, users.leader, users.member],
  // points
  '/api/v1/events/:eventId/points': {
    GET: [users.creator, users.admin, users.leader, users.member],
    POST: admins,
  },
  '/api/v1/events/:eventId/points/:pointId': admins,
  '/api/v1/events/:eventId/points/collect': [users.creator, users.admin, users.leader],
};

module.exports = endpointsAccessConfig;
