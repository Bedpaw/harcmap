import { store } from 'store';
import { ErrorMessage } from 'utils/error-message';
import { ADMIN_LOGIN_DATA, TEAM_LEADER_LOGIN_DATA, TEAM_MEMBER_LOGIN_DATA, OBSERVER_LOGIN_DATA } from 'config/app-env';
import { stringUtils } from 'utils/string';

const users = Object.freeze({
  teamLeader: TEAM_LEADER_LOGIN_DATA,
  admin: ADMIN_LOGIN_DATA,
  observer: OBSERVER_LOGIN_DATA,
  teamMember: TEAM_MEMBER_LOGIN_DATA,
});
let index = 0;
const indexer = {
  next: () => {
    if (index < 3) {
      index++;
    } else {
      index = 0;
    }
  },
};

function login (values) {
  store.dispatch('user/signOut')
    .then(() => store.dispatch('user/signIn', values))
    .catch(error => {
      if (error instanceof ErrorMessage) error.showMessage();
      else console.log(error);
    });
}

export const autoLogin = {
  switch () {
    const roles = [this.teamLeader, this.teamMember, this.observer, this.admin];
    roles[index]();
    indexer.next();
  },
  teamLeader: () => login(users.teamLeader),
  teamMember: () => login(users.teamMember),
  observer: () => login(users.observer),
  admin: () => login(users.admin),
  custom: (email, password = users.teamLeader.password) => {
    if (email.length === 1) {
      email = stringUtils.replaceAt(users.teamLeader.email, email, 4);
    }
    login({ email, password });
  },
};

export const DEV_USERS_LIST = users;
