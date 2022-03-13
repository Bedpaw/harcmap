import { ErrorMessage } from 'utils/error-message';
import { ERRORS } from 'utils/macros/errors';
import { api } from 'api';
import { autoUpdate } from 'utils/auto-update';
import { Module } from 'vuex';
import { User } from 'models/user';
import { urlUtils } from 'utils/url';
import router from 'src/router';
import { ROUTES } from 'config/routes-config';
import { appStorage } from 'utils/storage';
import { enterEvent } from 'utils/enter-event';
import { RouteLocationNormalized } from 'vue-router';

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
  },
  actions: {
    signIn (context, credentialsOrStartPath: RouteLocationNormalized | { email: string, password: string }) {
      return new Promise((resolve, reject) => {
        const appFirstRun = urlUtils.checkIfRouteLocationNormalized(credentialsOrStartPath);
        const signInPromise = (appFirstRun
          ? api.checkYourLoginSession()
          : api.signIn(credentialsOrStartPath)) as Promise<User>;
        const routeInfo = appFirstRun ? (credentialsOrStartPath as RouteLocationNormalized) : undefined;

        signInPromise
          .then(userData => {
            context.commit('setUser', userData);

            // Invitation key redirect
            const invitationKey = urlUtils.getInvitationKey();
            if (invitationKey) {
              router.push({
                name: ROUTES.joinEvent.name,
                query: { invitationKey },
              });
              resolve(true);
              return;
            }

            // wantsAutoLoginToEvent redirect
            const wantsAutoLoginToEvent = appStorage.getItem(appStorage.appKeys.wantsAutoLoginToEvent, appStorage.getIds.email());
            const recentEventId = appStorage.getItem(appStorage.appKeys.recentEvent, appStorage.getIds.email());
            if (recentEventId && wantsAutoLoginToEvent) {
              const recentEvent = userData.userEvents.find(event => event.eventId === recentEventId);
              if (recentEvent) {
                const { role, eventId, teamId } = recentEvent;
                enterEvent(role, eventId, teamId, routeInfo);
                resolve(true);
                return;
              }
            }

            // default redirect
            router.push({
              name: ROUTES.eventsList.name,
            });
            resolve(true);
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
