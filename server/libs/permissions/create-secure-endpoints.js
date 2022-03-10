const { errorCodes, AppError } = require('../errors');
const { getUserRoleFromSession, getUserTeamIdFromSession } = require('../utils');

/**
 * @description Get endpoint access config and parse it to unify format
 * @param config {object} - configuration of all endpoints
 * @param path {string} - path of our endpoint
 * @param httpMethod {string} - http method: GET, POST... (uppercase)
 * @return {[]}
 */
function getEndpointPermissions (config, path, httpMethod) {
  let endpointPermissions = config[path];
  let listOfUsersWithAccess;

  // if endpointPermissions are object
  if (endpointPermissions && endpointPermissions.constructor.name === 'Object') {
    endpointPermissions = endpointPermissions[httpMethod] || [];
  }

  // parse permissions configuration to array
  if (Array.isArray(endpointPermissions)) {
    listOfUsersWithAccess = endpointPermissions;
  } else {
    listOfUsersWithAccess = [endpointPermissions];
  }

  return listOfUsersWithAccess;
}

/**
 * @description Middleware for expressjs check in access of request to endpoint
 * @param app {object} - ExpressJS app instance
 * @param config {object} - configuration of access to endpoints
 */
function createSecuredEndpoints (app, config) {
  const endpointsUrlList = Object.keys(config);

  endpointsUrlList.forEach((endpointUrl) => {
    // todo logs
    app.all(endpointUrl, (request, response, next) => {
      const isAuth = request.isAuthenticated();
      const { method, user } = request;
      // get dynamic url elements
      const eventId = request.params.eventId || request.query.eventId;
      const teamId = request.params.teamId || request.query.teamId;
      // check if authorized user have permission to requested source
      let userRole;
      let userTeamId;

      if (isAuth && eventId) {
        const userTeamIdObject = getUserTeamIdFromSession(eventId, user);

        userRole = getUserRoleFromSession(eventId, user);
        userTeamId = userTeamIdObject ? userTeamIdObject.toString() : null;
      }

      const isAdminRole = ['creator', 'admin', 'observer'].includes(userRole);
      // request can be pass - default: false
      let PASS = false;

      const usersWithAccessToEndpoint = getEndpointPermissions(config, endpointUrl, method);

      // endpoint is open for all
      if (usersWithAccessToEndpoint.includes('guest')) {
        PASS = true;
      } else
      // only logged users can request for this resource
      if (usersWithAccessToEndpoint.includes('authenticated')) {
        PASS = isAuth;
      } else
      // user role(in event scope) is in path permission object
      if (usersWithAccessToEndpoint.includes(userRole)) {
        // try to get resource for specified team - check if user is it member
        if (teamId && !isAdminRole) {
          PASS = teamId === userTeamId;
        } else {
          PASS = true;
        }
      }

      // request pass
      request.PASS = PASS;

      next();
    });
  });

  app.use((request, response, next) => {
    const { path } = request;
    const pathToLowerCase = path.toLowerCase();

    // static files
    // const staticFilesExtensions = /\.(css|js|png|map|ico|jpg|jpeg|html)$/;
    // if (staticFilesExtensions.test(pathToLowerCase)) {
    //   request.PASS = true;
    // }

    // if path don't refers to server api
    if (!(/^\/api\/.*/.test(pathToLowerCase))) {
      request.PASS = true;
    }

    // adds support for index.html
    if (path === '/') {
      request.PASS = true;
    }

    // check if request passed verification
    if (!request.PASS) {
      // request rejected - ERROR
      if (typeof request.PASS !== 'boolean') {
        throw new AppError(errorCodes.PERMISSION_MIDDLEWARE_CANNOT_FIND_PATH_IN_SETTINGS);
      } else {
        throw new AppError(errorCodes.NO_PERMISSION_TO_RESOURCE, {
          httpStatus: 401,
        });
      }
    }
    next();
  });
}

module.exports = createSecuredEndpoints;
