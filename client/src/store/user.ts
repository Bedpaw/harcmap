import { ErrorMessage } from 'utils/error-message';
import { ERRORS } from 'utils/macros/errors';
import { api } from 'api';
import { autoUpdate } from 'utils/auto-update';
import { Module } from 'vuex';
import { User } from 'models/user';
import { postSignInActions, router } from 'src/router';
import { ROUTES } from 'config/routes-config';

export const user:Module<User, object> = {
  namespaced: true,
  state: {
    email: '',
    isActive: false,
    userId: '',
    userEvents: [],
  },
  getters: {
    email: state => state.email,
    isLogin: state => state.email !== '',
    userId: state => state.userId,
    userEvents: state => state.userEvents,
  },
  mutations: {
    setUser: (state, { email, userEvents, userId }) => {
      state.email = email;
      state.userEvents = userEvents || [];
      state.userEvents = userEvents;
      state.userId = userId;
    },
    signOut: state => {
      state.email = '';
      state.userEvents = [];
      state.userId = '';
      state.isActive = false;
      autoUpdate.stop();
    },
    addUserEvent: (state, userEvent) => {
      state.userEvents.push(userEvent);
    },
  },
  actions: {
    signIn (context, credentials: { email: string, password: string }) {
      return new Promise((resolve, reject) => {
        (api.signIn(credentials) as Promise<User>)
          .then(userData => {
            context.commit('setUser', userData);
            postSignInActions(userData).then(({ wantsEnterEvent, path }) => {
              router.push(wantsEnterEvent ? ROUTES.start.path : path).then(() => resolve(userData));
            });
          })
          .catch(reject);
      });
    },
    checkoutSession: function (context) {
      return new Promise((resolve, reject) => {
        (api.checkYourLoginSession() as Promise<User>)
          .then(userData => {
            context.commit('setUser', userData);
            resolve(userData);
          })
          .catch(reject);
      });
    },
    signOut (context) {
      return new Promise((resolve, reject) => {
        if (!context.state.userId) {
          resolve(true);
          return;
        }
        api.signOut()
          .finally(() => {
            context.commit('signOut');
            context.dispatch('resetState', null, { root: true })
              .then(() => resolve(true));
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
