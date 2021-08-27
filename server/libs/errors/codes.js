/**
 * This module contain map of all errors codes to it text version
 *
 * Structure of errors:
 * - xxxx - 4 numbers
 * - 34xx - first two numbers describe type(category) of error. List of types below.
 *   Allowed number for type of error: 10-99.
 * - xx27 - two last numbers identify unique error type.
 *   Allowed number for error id: 00-99
 *
 * Example numbers: 1024, 1201, 9900.
 *
 * List of errors category(first two number):
 * - 10 - ROUTING - request schemas validation, routing errors.
 * - 11 - SECURITY - authorization, registration, password reset, etc.
 * - 12 - DATABASE, MODEL - db integration, collecting data, validation data.
 * - 99 - OTHER - not defined in above.
 *
 */
const errors = {
  // 10xx - ROUTING
  NO_SCHEMA: 1000,
  REQUEST_VALIDATION_ERROR: 1001,
  // 11xx - SECURITY
  INVALID_CREDENTIALS: 1100,
  CANNOT_DESERIALIZE_USER: 1101,
  USER_IS_ALREADY_AUTHENTICATED: 1102,
  PERMISSION_MIDDLEWARE_CANNOT_FIND_PATH_IN_SETTINGS: 1103,
  NO_PERMISSION_TO_RESOURCE: 1104,
  CANNOT_LOGOUT_UNAUTHORIZED_USER: 1105,
  // 12xx - DATABASE, MODELS
  MODEL_VALIDATION_NOT_PASS: 1200,
  MODEL_INSERT_INCORRECT_LENGTH: 1200,
  MODEL_UPDATE_INCORRECT_LENGTH: 1201,
  // OTHER
  UNDEFINED_ERROR: 9900,
  RAW_ERROR: 9901,
};

module.exports = errors;
