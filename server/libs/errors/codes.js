/**
 * This module contains map of all errors codes to it text version
 * Docu on confluence
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
  NOT_LOGGED: 1106,
  SERIALIZE_ERROR: 1107,
  // 12xx - DATABASE, MODELS
  MODEL_VALIDATION_NOT_PASS: 1200,
  MODEL_INSERT_INCORRECT_LENGTH: 1201,
  MODEL_UPDATE_INCORRECT_LENGTH: 1202,
  MODEL_FOUND_DOCUMENT_WITH_UNIQUE_FIELD: 1203,
  // OTHER
  UNDEFINED_ERROR: 9900,
  RAW_ERROR: 9901,
};

module.exports = errors;
