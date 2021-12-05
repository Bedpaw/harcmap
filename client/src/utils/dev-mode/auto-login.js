import { api } from 'api';
import { store } from 'store';
import { ACCOUNT_TYPES } from 'utils/permissions';
import { ErrorMessage } from 'utils/error-message';
import { ADMIN_LOGIN_DATA, USER_LOGIN_DATA } from 'config/app-env';

const users = Object.freeze({
  teamLeader: USER_LOGIN_DATA,
  admin: ADMIN_LOGIN_DATA,
});

function login (values) {
  api.signOut({ user: store.getters['user/user'] })
    .then(() => api.signIn(values))
    .then(data => store.dispatch('user/signIn', data))
    .catch(error => {
      if (error instanceof ErrorMessage) error.showMessage();
      else console.log(error);
    });
}

export const autoLogin = {
  switch () {
    const accountType = store.getters['user/accountType'];
    if (accountType === ACCOUNT_TYPES.admin) this.teamLeader();
    else this.admin();
  },
  teamLeader: () => login(users.teamLeader),
  admin: () => login(users.admin),
};

export const DEV_USERS_LIST = users;
