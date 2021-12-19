import { api } from 'api';
import { store } from 'store';
import { ACCOUNT_TYPES } from 'utils/permissions';
import { ErrorMessage } from 'utils/error-message';
import { ADMIN_LOGIN_DATA, TEAM_LEADER_LOGIN_DATA, TEAM_MEMBER_LOGIN_DATA, OBSERVER_LOGIN_DATA } from 'config/app-env';
import router from 'src/router';
import { ROUTES } from 'config/routes-config';

const users = Object.freeze({
  teamLeader: TEAM_LEADER_LOGIN_DATA,
  admin: ADMIN_LOGIN_DATA,
  observer: OBSERVER_LOGIN_DATA,
  teamMember: TEAM_MEMBER_LOGIN_DATA,
});

function login (values) {
  api.signOut({ user: store.getters['user/user'] })
    .then(() => store.commit('user/signOut'))
    .then(() => api.signIn(values))
    .then(data => store.dispatch('user/signIn', data))
    .then(store.commit('event/setId', null, { root: true }))
    .then(store.commit('event/setUserRole', '', { root: true }))
    .then(router.push(ROUTES.eventsList))
    .then(() => router.hardReload())
    .catch(error => {
      if (error instanceof ErrorMessage) error.showMessage();
      else console.log(error);
    });
}

export const autoLogin = {
  switch () {
    const accountType = store.getters['event/userRole'];
    if (accountType === ACCOUNT_TYPES.teamLeader) this.admin();
    else this.teamLeader();
  },
  teamLeader: () => login(users.teamLeader),
  teamMember: () => login(users.teamMember),
  observer: () => login(users.observer),
  admin: () => login(users.admin),
};

export const DEV_USERS_LIST = users;
