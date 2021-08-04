const { errorCodes, AppError } = require('../errors');

/**
 * @description Get endpoint access config and parse it to unify format
 * @param config {object} - configuration of all endpoints
 * @param path {string} - path of our endpoint
 * @param httpMethod {string} - http method: GET, POST... (uppercase)
 * @return {[]}
 */
function getEndpointPermissions(config, path, httpMethod) {
	let endpointPermissions = config[path];
	let listOfUsersWithAccess;

	// if endpointPermissions are object
	if (endpointPermissions && typeof endpointPermissions === 'object') {
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
function createSecuredEndpoints(app, config) {
	const endpointsUrlList = Object.keys(config);

	endpointsUrlList.forEach((endpointUrl) => {
		// todo logs
		app.all(endpointUrl, (request, response, next) => {
			const { method, user } = request;
			const userRole = user ? user.role : null;
			const isAuth = request.isAuthenticated();
			// request can be pass - default: false
			let PASS = false;

			const usersWithAccessToEndpoint = getEndpointPermissions(config, endpointUrl, method);
			const customPermissions = usersWithAccessToEndpoint.filter((condition) => typeof condition === 'function');

			// endpoint is open for all
			if (usersWithAccessToEndpoint.includes('all')) {
				PASS = true;
			} else
			// only logged users can request for this resource
			if (usersWithAccessToEndpoint.includes('authenticated')) {
				PASS = isAuth;
			} else
			// user role is in path permission object
			if (usersWithAccessToEndpoint.includes(userRole)) {
				PASS = true;
			} else
			// custom conditions - function
			if (customPermissions.filter((conditionFn) => conditionFn(request)).length) {
				PASS = true;
			}

			// request pass
			if (!PASS) {
				// request rejected - ERROR
				const code = usersWithAccessToEndpoint[0] === undefined
					? errorCodes.PERMISSION_MIDDLEWARE_CANNOT_FIND_PATH
					: errorCodes.NO_PERMISSION_TO_RESOURCE;
				throw new AppError(code, {
					httpStatus: 401,
				});
			}
			next();
		});
	});
}

module.exports = createSecuredEndpoints;
