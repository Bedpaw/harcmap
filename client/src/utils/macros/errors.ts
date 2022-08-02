import { translator } from 'src/dictionary';
import { apiErrorTranslationFactory } from 'utils/translations';
import { ApiErrors } from 'models/errors';

const T = {
  general: apiErrorTranslationFactory('general'),
  event: apiErrorTranslationFactory('event'),
  point: apiErrorTranslationFactory('point'),
  user: apiErrorTranslationFactory('user'),
  auth: apiErrorTranslationFactory('auth'),
  team: apiErrorTranslationFactory('team'),
};

export const ERRORS = {
  eventIdIsRequired: translator.t('error.eventIdIsRequired'),
  elementIdIsRequiredForMap: translator.t('error.elementIdIsRequiredForMap'),
  fakeErrorInMockApi: translator.t('error.fakeErrorInMockApi'),
  dataAfterSignIn: translator.t('error.dataAfterSignIn'),
  signIn: T.auth('signIn'),
  signOut: T.auth('signOut'),
};

const EVENT_API_ERRORS: ApiErrors = {
  getEventById: {
    defaultError: T.event('getEventById'),
  },
  updateEvent: {
    defaultError: T.event('updateEvent'),
  },
  addEvent: {
    defaultError: T.event('addEvent'),
  },
  checkEvent: {
    defaultError: T.event('checkEvent'),
  },
  joinEvent: {
    defaultError: T.event('joinEvent'),
  },
  resetInvitation: {
    defaultError: T.event('resetInvitation'),
  },
};
const POINT_API_ERRORS: ApiErrors = {
  collectPoint: {
    defaultError: T.point('collectPoint'),
  },
  addPoint: {
    defaultError: T.point('addPoint'),
  },
  editPoint: {
    defaultError: T.point('editPoint'),
  },
  removePoint: {
    defaultError: T.point('removePoint'),
  },
  getPointsByEventId: {
    defaultError: T.point('getPointsByEventId'),
  },
  getCategoriesByEventId: {
    defaultError: T.point('getCategoriesByEventId'),
  },
  addPointCategory: {
    defaultError: T.point('addPointCategory'),
  },
  updatePointCategory: {
    defaultError: T.point('updatePointCategory'),
  },
  deletePointCategory: {
    defaultError: T.point('deletePointCategory'),
  },
};
const AUTH_API_ERRORS: ApiErrors = {
  signIn: {
    defaultError: T.auth('signIn'),
  },
  checkYourLoginSession: {
    defaultError: T.auth('checkYourLoginSession'),
  },
  signOut: {
    defaultError: T.auth('signOut'),
  },
  signUp: {
    defaultError: T.auth('signUp'),
  },
};
const TEAM_API_ERRORS: ApiErrors = {
  getAllTeamsByEventId: {
    defaultError: T.team('getAllTeamsByEventId'),
  },
  getTeamByEventId: {
    defaultError: T.team('getTeamByEventId'),
  },
};
const USER_API_ERRORS: ApiErrors = {
  getAllUsersByEventId: {
    defaultError: T.user('getAllUsersByEventId'),
  },
  activateUser: {
    defaultError: T.user('activateUser'),
  },
  getUser: {
    defaultError: T.user('getUser'),
  },
  updateUser: {
    defaultError: T.user('updateUser'),
  },
  sendResetPassword: {
    defaultError: T.user('sendResetPassword'),
  },
  changePassword: {
    defaultError: T.user('changePassword'),
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
  ...AUTH_API_ERRORS,
  ...TEAM_API_ERRORS,
  ...USER_API_ERRORS,
};
