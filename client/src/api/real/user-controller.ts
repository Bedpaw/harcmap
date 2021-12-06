import { API_ERRORS } from 'utils/macros/errors';
import { httpService } from 'config/http-service';

const urls = {
  getUsers: '/users',
  resetPassword: '/users/reset-password',
  user: (id: string) => '/users/' + id,
  activateAccount: (key: string) => '/account-activation/' + key,
};

export const userController = {
  allUsers (eventId: string) {
    return httpService.get({
      url: urls.getUsers,
      queryObject: { eventId },
      errorOptions: API_ERRORS.all,
    });
  },
  activateUser (key: string) {
    return httpService.get({
      url: urls.activateAccount(key),
      errorOptions: API_ERRORS.all,
    });
  },

  getUser (userId: string) {
    return httpService.get({
      url: urls.user(userId),
      errorOptions: API_ERRORS.all,
    });
  },

  updateUser (userId: string) {
    return httpService.put({
      url: urls.user(userId),
      errorOptions: API_ERRORS.all,
    });
  },

  sendResetPassword (email: string) {
    return httpService.post({
      url: urls.resetPassword,
      body: { email },
      errorOptions: API_ERRORS.remindPassword,
    });
  },

  changePassword (password: string, key: string) {
    return httpService.put({
      url: `${urls.resetPassword}/${key}`,
      body: { password },
      errorOptions: API_ERRORS.changePassword,
    });
  },
};
