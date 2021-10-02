/**
 * Module with constructor of app main override error class.
 * Customized error help with pass additional information
 * about error.
 * Help too in use error codes
 */
const codes = require('./codes');

function getKeyByValue (object, value) {
	return Object.keys(object).find((key) => object[key] === value);
}

// This function get name of error from error codes list
function getCodeName (code) {
	const codeKey = getKeyByValue(codes, code);
	return codeKey.toLowerCase().replace(/_/g, ' ');
}

/**
 * @class
 * @description Class for General Application error
 * Add some additional fields
 */
class AppError extends Error {
	/**
	 * @param code {number} - error code from errorCodes library
	 * @param options {{
	 * 	[description]: any,
	 * 	[httpStatus]: number,
	 * 	[message]: string
	 * }}
	 */
	constructor (code, options = {}) {
		super();

		const {
			// HTTP Status Code to add to response. OPTIONAL
			httpStatus,
			// Message to add (if not given reference to this.rawMessage). OPTIONAL
			message,
			// more details
			details,
		} = options;

		// default: undefined
		this.message = message || getCodeName(code);
		// default: undefined
		this.code = code;
		// default: undefined
		this.httpStatus = httpStatus;
		// default: undefined
		this.details = details;
	}
}

module.exports = AppError;
