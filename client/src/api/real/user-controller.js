import { API_ERRORS } from 'utils/macros/errors';
import { httpService } from 'config/http-service';

const urls = {
  getUsers: '/users',
  resetPassword: '/users/reset-password',
  user: (id) => '/users/' + id,
  activateAccount: (key) => '/account-activation/' + key,
};

export const userController = {
  allUsers ({ eventId }) {
    return httpService.get({
      url: urls.getUsers,
      queryObject: { eventId },
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.all,
        },
      },
    });
  },
  activateUser ({ key }) {
    return httpService.get({
      url: urls.activateAccount(key),
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.all,
        },
      },
    });
  },

  getUser ({ userId }) {
    return httpService.get({
      url: urls.user(userId),
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.all,
        },
      },
    });
  },

  updateUser ({ userId }) {
    return httpService.put({
      url: urls.user(userId),
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.all,
        },
      },
    });
  },

  sendResetPassword ({ email }) {
    return httpService.post({
      url: urls.resetPassword,
      body: { email },
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.remindPassword,
        },
      },
    });
  },

  changePassword ({ password, key }) {
    return httpService.put({
      url: `${urls.resetPassword}/${key}`,
      body: { password },
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.changePassword,
        },
      },
    });
  },
};
