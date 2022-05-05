import { API_ERRORS } from 'src/utils/macros/errors';
import { httpService } from 'config/http-service';
import { Mapper } from 'models/utils/mapper';
import { UserDTO } from 'models/dtos/user';
import { User } from 'models/user';

type Credentials = { email: string, password: string, invitationKey?: string }
const urls = {
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  signOut: '/auth/sign-out',
};

export const authController = {
  signIn (credentials: Credentials) {
    return httpService.post<UserDTO, User>({
      url: urls.signIn,
      body: credentials,
      successCallback: (data) => Mapper.mapUserIn(data),
      errorOptions: API_ERRORS.signIn,
    });
  },
  checkYourLoginSession () {
    return httpService.post<UserDTO, User>({
      url: urls.signIn,
      successCallback: (data) => Mapper.mapUserIn(data),
      errorOptions: API_ERRORS.checkYourLoginSession,
    });
  },
  signUp (credentials: Credentials) {
    credentials = credentials.invitationKey && credentials.invitationKey !== ''
      ? credentials
      : { email: credentials.email, password: credentials.password };
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
