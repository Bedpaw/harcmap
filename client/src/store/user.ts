import { ErrorMessage } from 'utils/error-message';
import { ERRORS } from 'utils/macros/errors';
import { api } from 'api';
import { autoUpdate } from 'utils/auto-update';
import { Module } from 'vuex';
import { User } from 'models/user';

interface UserType extends User {
  firstLogin: boolean
}

export const user:Module<UserType, object> = {
  namespaced: true,
  state: {
    email: '',
    isActive: false,
    userId: '',
    firstLogin: false,
    userEvents: [],
  },
  getters: {
    email: state => state.email,
    isLogin: state => state.email !== '',
    firstLogin: state => state.firstLogin,
    userEvents: state => state.userEvents,
  },
  mutations: {
    setUser: (state, { email, userEvents }) => {
      state.email = email;
      state.userEvents = userEvents;
    },
    signOut: state => {
      state.email = '';
      state.firstLogin = true;
      state.userEvents = [];
      autoUpdate.stop();
    },
  },
  actions: {
    signIn (context, data) {
      return new Promise((resolve) => {
        context.commit('setUser', data);
        resolve(true);
      });
    },
    signOut (context) {
      return new Promise((resolve, reject) => {
        api.signOut()
          .finally(() => {
            context.commit('signOut');
            context.commit('event/setId', null, { root: true });
            resolve(true);
          })
          .catch(() => {
            const error = new ErrorMessage(ERRORS.signOut);
            error.showMessage();
            reject(error);
          });
      });
    },
  },
};
