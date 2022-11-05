import { API_ERRORS } from 'utils/macros/errors';
import { store } from 'store';
import { translator } from 'src/dictionary';
import { ErrorMessage } from 'utils/error-message';
import { HttpService } from '@dbetka/wdk/lib/http-service';
import { API_URL } from 'config/app-env';
import { ApiError, ServerError } from 'models/errors';
import { fetchProxy } from 'utils/fetchProxy';

export const httpService = HttpService.createInstance<ApiError, ServerError>({
  fetchProxy,
  apiUrl: API_URL + '/api/v1',
  defaultRequestConfig: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
  defaultErrorCallback: (serverError, options) => {
    const errorMessage = getSpecificError(serverError.error)
      ?? options?.defaultError
      ?? API_ERRORS.undefined.defaultError;
    return new ErrorMessage(errorMessage, { code: serverError?.error });
  },
  connectionErrorCallback: () => {
    return new ErrorMessage(translator.t('apiError.general.notOnline'));
  },
  serverErrorCallback: (serverError) => {
    return new ErrorMessage(getSpecificError(serverError?.error) ?? translator.t(API_ERRORS.undefined.defaultError));
  },
  permissionErrorCallback: (serverError) => {
    store.commit('user/signOut');
    return new ErrorMessage(getSpecificError(serverError?.error) ?? translator.t('apiError.general.unauthorizedAccess'));
  },
});
const errors = {
  // 10xx - ROUTING
  NO_SCHEMA: 1000,
  REQUEST_VALIDATION_ERROR: 1001,
  // 11xx - SECURITY
  INVALID_CREDENTIALS: 1100,
  CANNOT_DESERIALIZE_USER: 1101, // DEPRECATED
  USER_IS_ALREADY_AUTHENTICATED: 1102, // DEPRECATED
  PERMISSION_MIDDLEWARE_CANNOT_FIND_PATH_IN_SETTINGS: 1103,
  NO_PERMISSION_TO_RESOURCE: 1104,
  CANNOT_LOGOUT_UNAUTHORIZED_USER: 1105,
  NOT_LOGGED: 1106,
  SERIALIZE_ERROR: 1107,
  ACCOUNT_IS_NOT_ACTIVE: 1108,
  // 12xx - DATABASE, MODELS
  MODEL_VALIDATION_NOT_PASS: 1200,
  MODEL_INSERT_INCORRECT_LENGTH: 1201,
  MODEL_UPDATE_INCORRECT_LENGTH: 1202,
  MODEL_FOUND_DOCUMENT_WITH_UNIQUE_FIELD: 1203,
  CANNOT_UPDATE_COLLECTED_POINT: 1204,
  CANNOT_UPDATE_TEAM_COLLECTED_POINTS: 1205,
  CANNOT_CREATE_USEREVENTS_DOCUMENT: 1206,
  CANNOT_UPDATE_USER_EVENTS: 1207,
  CANNOT_CREATE_TEAM: 1208,
  ADMINISTRATOR_CANT_COLLECT_POINTS: 1209,
  KEY_WITH_THIS_ID_NOT_EXIST: 1210,
  CANNOT_REFRESH_KEY: 1211,
  CANNOT_DELETE_IN_USE_CATEGORY: 1212,
  THIS_EMAIL_ALREADY_EXIST: 1213,
  THIS_EVENTNAME_ALREADY_EXIST: 1214,
  THIS_TEAMNAME_ALREADY_EXIST: 1215,
  THIS_KEY_ALREADY_EXIST: 1216,
  // 13xx - POINTS ERRORS
  POINT_NOT_EXIST: 1300,
  POINT_ALREADY_COLLECTED: 1301,
  // 14xx - KEYS/EVENTS ERRORS
  KEY_NOT_EXIST: 1400, // DEPRECATED
  KEY_OR_USER_NOT_EXIST: 1401,
  USER_ALREADY_PARTICIPLE_IN_THIS_EVENT: 1402,
  REQUIRE_TEAMNAME: 1403,
  THIS_USER_ID_DOESNT_BELONG_TO_YOU: 1404,
  REQUIRE_TEAMCOLOR: 1405,
  CANNOT_CREATE_EVENT: 1406,
  CANNOT_CREATE_ADMIN_KEY: 1407,
  CANNOT_CREATE_OBSERVER_KEY: 1408,
  CANNOT_CREATE_TEAMLEADER_KEY: 1409,
  CANNOT_CREATE_TEAMMEMBER_KEY: 1410,
  // 15xx - 3rd part services
  MAIL_SERVICE_ERROR: 1500,
  // 16xx - Account activation / Password reset
  INVALID_ACTIVATION_KEY: 1600,
  CANNOT_UPDATE_USER_ACTIVATION: 1601,
  CANNOT_UPDATE_USER_RESET_PASSWORD_REQUEST: 1602,
  INVALID_RESET_KEY: 1603,
  PASSWORD_RESET_KEY_EXPIRED: 1604,
  CANNOT_UPDATE_USER_RESET_PASSWORD: 1605,
  // OTHER
  UNDEFINED_ERROR: 9900,
  RAW_ERROR: 9901,
};
const getSpecificError = (code: number) => {
  const errorMessages = {
    [errors.ACCOUNT_IS_NOT_ACTIVE]: 'ACCOUNT_IS_NOT_ACTIVE',
    [errors.ADMINISTRATOR_CANT_COLLECT_POINTS]: 'ADMINISTRATOR_CANT_COLLECT_POINTS',
    [errors.KEY_WITH_THIS_ID_NOT_EXIST]: 'KEY_WITH_THIS_ID_NOT_EXIST',
    [errors.CANNOT_DELETE_IN_USE_CATEGORY]: 'CANNOT_DELETE_IN_USE_CATEGORY',
    [errors.THIS_EMAIL_ALREADY_EXIST]: 'THIS_EMAIL_ALREADY_EXIST',
    [errors.THIS_EVENTNAME_ALREADY_EXIST]: 'THIS_EVENTNAME_ALREADY_EXIST',
    [errors.THIS_TEAMNAME_ALREADY_EXIST]: 'THIS_TEAMNAME_ALREADY_EXIST',
    [errors.THIS_KEY_ALREADY_EXIST]: 'THIS_KEY_ALREADY_EXIST',
    [errors.POINT_NOT_EXIST]: 'POINT_NOT_EXIST',
    [errors.POINT_ALREADY_COLLECTED]: 'POINT_ALREADY_COLLECTED',
    [errors.KEY_OR_USER_NOT_EXIST]: 'KEY_OR_USER_NOT_EXIST',
    [errors.USER_ALREADY_PARTICIPLE_IN_THIS_EVENT]: 'USER_ALREADY_PARTICIPLE_IN_THIS_EVENT',
  };
  return errorMessages[code] ? translator.t('apiError.specific.' + errorMessages[code]) : null;
};
