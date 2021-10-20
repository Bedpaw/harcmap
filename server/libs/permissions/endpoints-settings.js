// available levels of access
const users = {
  creator: 'creator',
  admin: 'admin',
  leader: 'teamLeader',
  members: 'teamMember',
  // all registered users
  authenticated: 'authenticated',
  // logged user with access to his "_id" resources
  // owner: (request) => request.user && request.params.id === request.user._id,
  // open for all - DONT REQUIRE AUTHORIZATION
  all: 'all',
};

// map can contain array of permission users
// each endpoint require one(OR) of permission user not both or all(AND)
const endpointsAccessConfig = {
  '/about': users.all,
  '/api/v1/users': users.creator,
  '/api/v1/events/:eventId': {
    GET: users.creator,
    PUT: users.creator,
  },
  // TODO zabezpieczyć pole "role" dla "users.owner"
  '/api/v1/users/:userId': {
    GET: users.creator,
    PUT: users.creator,
    DELETE: users.creator,
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
  '/api/v1/events/:eventId/categories': {
    GET: users.creator,
    POST: users.creator,
  },
};

module.exports = endpointsAccessConfig;
