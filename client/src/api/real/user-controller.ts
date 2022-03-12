import { API_ERRORS } from 'utils/macros/errors';
import { httpService } from 'config/http-service';
import { UserDTO } from 'models/dtos/user';
import { UserInEvent } from 'models/user';
import { Mapper } from 'models/utils/mapper';

const urls = {
  getUsers: '/users',
  resetPassword: '/users/reset-password',
  changePassword: (key: string) => `/users/reset-password/${key}`,
  getUser: (id: string) => '/users/' + id,
  updateUser: (id: string) => '/users/' + id,
  activateAccount: (key: string) => '/account-activation/' + key,
};

export const userController = {
  getAllUsersByEventId (eventId: string) {
    return httpService.get<UserDTO[], UserInEvent[]>({
      url: urls.getUsers,
      queryObject: { eventId },
      errorOptions: API_ERRORS.getAllUsersByEventId,
      successCallback: data => data.map(user => Mapper.mapUserInEvent(user)),
    });
  },
  activateUser (key: string) {
    return httpService.get({
      url: urls.activateAccount(key),
      errorOptions: API_ERRORS.activateUser,
    });
  },

  getUser (userId: string, eventId: string) {
    return httpService.get<UserDTO, UserInEvent>({
      url: urls.getUser(userId),
      errorOptions: API_ERRORS.getUser,
      queryObject: { eventId },
      successCallback: user => Mapper.mapUserInEvent(user),
    });
  },

  updateUser (userId: string) {
    return httpService.put({
      url: urls.updateUser(userId),
      errorOptions: API_ERRORS.updateUser,
    });
  },

  sendResetPassword (email: string) {
    return httpService.post({
      url: urls.resetPassword,
      body: { email },
      errorOptions: API_ERRORS.sendResetPassword,
    });
  },

  changePassword (password: string, key: string) {
    return httpService.post({
      url: urls.changePassword(key),
      body: { password },
      errorOptions: API_ERRORS.changePassword,
    });
  },
};
