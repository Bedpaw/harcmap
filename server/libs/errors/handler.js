/**
 *  Module responsible for handling errors from express 
 *  router and return all necessary data about error.
 */
const AppError = require('./app-error');
const errorCodes = require('./codes');
const logger = require('../logger');
/**
 * @description Method handling endpoints errors
 * Support for: Error object instance and AppError instance
 * @param error {object} - Error or AppError instance
 * @param request {object}
 * @param response {object}
 * @param next {function}
 */
// eslint-disable-next-line no-unused-vars
function handler(error, request, response, next) {
	// default values
	let errorCode = errorCodes.UNDEFINED_ERROR;
	let errorMessage = error;
	let errorDetails;
	let httpStatus = 500;

	// handling our error - AppError
	if (error instanceof AppError) {
		errorCode = error.code;
		errorMessage = error.message;
		errorDetails = error.details;
		httpStatus = error.httpStatus || httpStatus;
	} else if (error instanceof Error) {
		// handling native error - Error
		errorCode = errorCodes.RAW_ERROR;
		errorMessage = error.message;

		console.log(error);
	}

	// todo logger
	logger.error(errorCode);

	// response
	response.status(httpStatus).send({
		error: errorCode,
		message: errorMessage,
		errorDetails,
	});
}

module.exports = handler;
