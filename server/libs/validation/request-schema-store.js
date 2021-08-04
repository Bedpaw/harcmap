/**
 * @description Contain all endpoint schemas
 * @type {object}
 */
const requestSchemaStore = {};

/**
 * @description Add schema to middleware
 * @param path {string} - path where to add schemas
 * @param httpMethodsWithSchema {{
 * 	[GET]:object,
 * 	[POST]:object,
 * 	[PUT]:object,
 * 	[DELETE]:object
 * }} - object with httpMethods(uppercase) map to it schema
 */
function addEndpointValidation(path, httpMethodsWithSchema) {
	requestSchemaStore[path] = httpMethodsWithSchema;
}

module.exports = {
	requestSchemaStore,
	addEndpointValidation,
};
