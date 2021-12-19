import { ErrorMessage } from 'utils/error-message';
import { ERRORS } from 'utils/macros/errors';
import { api } from 'api';
import { autoUpdate } from 'utils/auto-update';
import { Module } from 'vuex';
import { UserDTO } from 'models/dtos/user';

interface UserType extends UserDTO {
  firstLogin: boolean
}

export const user:Module<UserType, object> = {
  namespaced: true,
  state: {
    email: '',
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
    // addCollectedPointId: (state, payload) => (state.collectedPointsIds.push(payload)),
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
        // context.commit('event/setId', eventId, { root: true });
        // context.commit('setUserTeam', userTeam);
        // context.commit('setAccountType', accountType);
        // context.commit('setFirstLogin', firstLogin.state);
        // firstLogin.setCookie();
        // context.commit('setLimitedPermissions', limitedPermissions);
        // context.commit('setCollectedPointsIds', collectedPointsIds);
        // context.dispatch('event/download', undefined, { root: true })
        //   .then(() => {
        //     autoUpdate.run();
        //     resolve();
        //   })
        //   .catch(() => {
        //     context.dispatch('signOut').catch(() => undefined);
        //     reject(new ErrorMessage(ERRORS.signIn, { hard: true }));
        //   });
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
