import { API_ERRORS, API_WARNS } from 'utils/macros/errors';
import { httpService } from 'config/http-service';

const urls = {
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  signOut: '/auth/sign-out',
};

export const authController = {
  signIn ({ email, password }) {
    return httpService.post({
      url: urls.signIn,
      body: { email, password },
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.signIn,
        },
        warnConfig: {
          ...API_WARNS.signIn,
        },
      },
    });
  },
  checkYourLoginSession () {
    return httpService.post({
      url: urls.signIn,
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.checkYourLoginSession,
        },
      },
    });
  },
  signUp ({ email, password }) {
    return httpService.post({
      url: urls.signUp,
      body: {
        email,
        password,
      },
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.signUp,

        },
      },
    });
  },
  signOut () {
    return httpService.post({
      url: urls.signOut,
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.signOut,
        },
      },
    });
  },
};
