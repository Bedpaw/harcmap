import { API_ERRORS } from 'utils/macros/errors';
import { httpService } from 'config/http-service';
import { UserDTO } from 'models/dtos/user';
import { UserInEvent } from 'models/user';
import { Mapper } from 'models/utils/mapper';

const urls = {
  getUsers: '/users',
  resetPassword: '/users/reset-password',
  user: (id: string) => '/users/' + id,
  activateAccount: (key: string) => '/account-activation/' + key,
};

export const userController = {
  getAllUsersByEventId (eventId: string) {
    return httpService.get<UserDTO[], UserInEvent[]>({
      url: urls.getUsers,
      queryObject: { eventId },
      errorOptions: API_ERRORS.all,
      successCallback: data => data.map(user => {
        // TODO Remove add fields, should be from backend
        user.userEvents[0].eventDuration = {
          endDate: Number(new Date()),
          startDate: Number(new Date()),
        };
        return Mapper.mapUserInEvent(user);
      }),
    });
  },
  activateUser (key: string) {
    return httpService.get({
      url: urls.activateAccount(key),
      errorOptions: API_ERRORS.all,
    });
  },

  getUser (userId: string, eventId: string) {
    return httpService.get<UserDTO, UserInEvent>({
      url: urls.user(userId),
      errorOptions: API_ERRORS.all,
      queryObject: { eventId },
      successCallback: user => Mapper.mapUserInEvent(user),
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
