import { API_ERRORS, API_WARNS } from 'utils/macros/errors';
import { httpService } from 'src/config/http-service';

export const userController = {
  allUsers () {
    return httpService.get({
      url: '/user/all',
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.all,
        },
      },
    });
  },
  signIn ({ user, password }) {
    return httpService.post({
      url: '/user/login',
      body: { user, password },
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
      url: '/user/login',
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.checkYourLoginSession,
        },
      },
    });
  },
  signUp ({ user, password, userTeam, eventId }) {
    return httpService.post({
      url: '/user',
      body: {
        user,
        password,
        userTeam,
        eventId,
      },
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.signUp,

        },
      },
    });
  },
  remindPassword ({ user }) {
    return httpService.post({
      url: '/user/remind',
      body: { user },
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.remindPassword,
        },
      },
    });
  },
  signOut ({ user }) {
    return httpService.delete({
      url: '/user/login',
      body: { user },
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.signOut,
        },
      },
    });
  },
  changePassword ({ password, key }) {
    return httpService.put({
      url: `/user/remind/${key}`,
      body: { password },
      responseConfig: {
        errorConfig: {
          ...API_ERRORS.changePassword,
        },
      },
    });
  },
};
