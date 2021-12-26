import validateCodes from 'validateCodes';
import { translator } from 'src/dictionary';
import { apiErrorTranslationFactory } from 'utils/translations';
import { ApiErrors } from 'models/errors';

const T = {
  general: apiErrorTranslationFactory('general'),
  event: apiErrorTranslationFactory('event'),
  point: apiErrorTranslationFactory('point'),
  users: apiErrorTranslationFactory('users'),
  auth: apiErrorTranslationFactory('auth'),
  registerAndAccount: apiErrorTranslationFactory('registerAndAccount'),
};

export const ERRORS = {
  eventIdIsRequired: translator.t('error.eventIdIsRequired'),
  elementIdIsRequiredForMap: translator.t('error.elementIdIsRequiredForMap'),
  fakeErrorInMockApi: translator.t('error.fakeErrorInMockApi'),
  dataAfterSignIn: translator.t('error.dataAfterSignIn'),
  signIn: T.auth('signIn'),
  signOut: T.auth('signOut'),
};

export const API_WARNS = {
  undefined: {
    defaultWarn: translator.t('apiWarn.undefined'),
  },
  signIn: {
    warns: [
      [
        [validateCodes.FIRST_WARN_FROM_CROSSDEVICE_VISIT],
        translator.t('apiWarn.firstWarnFromCrossdeviceVisit'),
      ],
      [
        [validateCodes.LAST_WARN_FROM_CROSSDEVICE_VISIT],
        translator.t('apiWarn.lastWarnFromCrossdeviceVisit'),
      ],
      [
        [validateCodes.LAST_CROSSDEVICE_VISIT],
        translator.t('apiWarn.lastCrossdevice_visit'),
      ],
    ],
  },
};

const EVENT_API_ERRORS: ApiErrors = {
  getEventById: {
    defaultError: T.event('getEventById'),
    errors: [],
  },
  getPointsByEventId: {
    defaultError: T.event('getPointsByEventId'),
    errors: [],
  },
  getCategoriesByEventId: {
    defaultError: T.event('getCategoriesByEventId'),
  },
  updateEvent: {
    defaultError: T.event('updateEvent'),
    errors: [
      [
        [validateCodes.EVENT_END_DATE_IS_EMPTY],
        T.event('eventEndDateIsEmpty'),
      ],
      [
        [validateCodes.EVENT_START_DATE_IS_EMPTY],
        T.event('eventStartDateIsEmpty'),
      ],
    ],
  },
  addEvent: {
    defaultError: T.event('addEvent'),
    errors: [
      [
        [validateCodes.EVENT_END_DATE_IS_EMPTY],
        T.event('eventEndDateIsEmpty'),
      ],
      [
        [validateCodes.EVENT_START_DATE_IS_EMPTY],
        T.event('eventStartDateIsEmpty'),
      ],
    ],
  },
};
const POINT_API_ERRORS: ApiErrors = {
  collectPoint: {
    defaultError: T.point('collectPoint'),
    errors: [
      [
        [
          validateCodes.DATABASE_DATA_CONFLICT_ERROR,
          validateCodes.POINT_ALREADY_COLLECTED,
        ],
        T.point('pointCollectedEarlier'),
      ],
      [
        [validateCodes.DATABASE_NO_RESULT_ERROR],
        T.point('pointNoExist'),
      ],
      [
        [validateCodes.EVENT_IS_OUT_OF_DATE],
        T.event('eventIsOutOfDate'),
      ],
      [
        [validateCodes.EVENT_BEFORE_START_DATE],
        T.event('eventBeforeStart'),
      ],
    ],
  },
  addPoint: {
    defaultError: T.point('addPoint'),
    errors: [],
  },
  editPoint: {
    defaultError: T.point('editPoint'),
    errors: [],
  },
  removePoint: {
    defaultError: T.point('removePoint'),
    errors: [
      [
        [validateCodes.POINT_ID_OR_EVENT_ID_NOT_EXIST],
        T.point('pointIdOrEventIdNotExist'),
      ],
    ],
  },
};
const USERS_API_ERRORS: ApiErrors = {
  all: {
    defaultError: T.users('all'),
    errors: [
      [
        [validateCodes.UNAUTHORIZED_ACCESS],
        T.general('unauthorizedAccess'),
      ],
    ],
  },
};
const AUTH_API_ERRORS: ApiErrors = {
  signIn: {
    defaultError: T.auth('signIn'),
    errors: [
      [
        [
          validateCodes.IS_NOT_EMAIL,
          validateCodes.PASSWORD_TOO_SHORT,
          validateCodes.PASSWORD_HAS_NOT_NUMBER,
          validateCodes.LOGIN_INVALID_PASSWORD,
          validateCodes.LOGIN_INVALID_USER,
          validateCodes.DATABASE_NO_RESULT_ERROR,
        ],
        T.auth('signInData'),
      ],
      [
        [validateCodes.USER_IS_LOGGED_ON_ANOTHER_DEVICE],
        T.auth('signInOnOtherDevice'),
      ],
      [
        [validateCodes.ACCOUNT_IS_INACTIVE],
        T.auth('inactiveAccount'),
      ],
      [
        [validateCodes.TO_MANY_CROSSDEVICE_VISITS],
        T.general('toManyCrossdeviceVisits'),
      ],
    ],
  },
  checkYourLoginSession: {
    defaultError: T.auth('checkYourLoginSession'),
    errors: [],
  },
  signOut: {
    defaultError: T.auth('signOut'),
    errors: [],

  },
};
const REGISTER_AND_ACCOUNT_API_ERRORS: ApiErrors = {
  signUp: {
    defaultError: T.registerAndAccount('signUp'),
    errors: [
      [
        [validateCodes.EVENT_ID_NOT_EXIST],
        T.registerAndAccount('eventIdNotExist'),
      ],
      [
        [validateCodes.USER_EXIST],
        T.registerAndAccount('userExist'),
      ],
    ],
  },
  remindPassword: {
    defaultError: T.registerAndAccount('remindPassword'),
    errors: [],

  },

  changePassword: {
    defaultError: T.registerAndAccount('changePassword'),
    errors: [],
  },
};

export const API_ERRORS: ApiErrors = {
  undefined: {
    defaultError: T.general('undefined'),
  },
  information: {
    defaultError: T.general('undefined'),
  },
  ...EVENT_API_ERRORS,
  ...POINT_API_ERRORS,
  ...USERS_API_ERRORS,
  ...AUTH_API_ERRORS,
  ...REGISTER_AND_ACCOUNT_API_ERRORS,
};
