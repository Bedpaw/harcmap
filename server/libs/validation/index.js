const validateRequests = require('./requests-validation');
const { addEndpointValidation } = require('./request-schema-store');

module.exports = {
	validateRequests,
	addEndpointValidation,
};
