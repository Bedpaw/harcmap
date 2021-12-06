import { API_ERRORS } from 'src/utils/macros/errors';
import { httpService } from 'config/http-service';

type Credentials = { email: string, password: string }
const urls = {
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  signOut: '/auth/sign-out',
};

export const authController = {
  signIn (credentials: Credentials) {
    return httpService.post({
      url: urls.signIn,
      body: credentials,
      errorOptions: API_ERRORS.signIn,
    });
  },
  checkYourLoginSession () {
    return httpService.post({
      url: urls.signIn,
      errorOptions: API_ERRORS.checkYourLoginSession,
    });
  },
  signUp (credentials: Credentials) {
    return httpService.post({
      url: urls.signUp,
      body: credentials,
      errorOptions: API_ERRORS.signUp,

    });
  },
  signOut () {
    return httpService.post({
      url: urls.signOut,
      errorOptions: API_ERRORS.signOut,
    });
  },
};
