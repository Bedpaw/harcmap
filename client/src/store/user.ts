import { ErrorMessage } from 'utils/error-message';
import { ERRORS } from 'utils/macros/errors';
import { api } from 'api';
import { autoUpdate } from 'utils/auto-update';
import { ActionContext, Module } from 'vuex';
import { User } from 'models/user';
import { urlUtils } from 'utils/url';
import router from 'src/router';
import { ROUTES } from 'config/routes-config';
import { appStorage } from 'utils/storage';
import { RouteLocationNormalized } from 'vue-router';
import { updateStorageAfterSuccessLogIn } from 'utils/enter-event';
// Invitation key redirect

// TODO

const performSignInActions = (context: ActionContext<User, object>, userData: User): Promise<boolean> => {
  /* Resolve true if should log into event, false if not */
  return new Promise((resolve) => {
    context.commit('setUser', userData);

    const invitationKey = urlUtils.getInvitationKey();
    if (invitationKey) {
      resolve(false);
    }

    const wantsAutoLoginToEvent = appStorage.getItem(appStorage.appKeys.wantsAutoLoginToEvent, appStorage.getIds.email());
    const recentEventId = appStorage.getItem(appStorage.appKeys.recentEvent, appStorage.getIds.email());

    if (recentEventId && wantsAutoLoginToEvent) {
      const recentEvent = userData.userEvents.find(event => event.eventId === recentEventId);
      if (recentEvent) {
        const {
          role,
          eventId,
          teamId,
        } = recentEvent;
        return context.dispatch('event/download', {
          eventId,
          teamId,
          role,
        }, { root: true })
          .then(() => {
            updateStorageAfterSuccessLogIn(eventId);
            resolve(true);
          });
      }
    }
    return resolve(false);
  });
};

const redirectAfterEnterEvent = (to?: RouteLocationNormalized) => {
  let final;
  const lastRoute = appStorage.getItem(appStorage.appKeys.lastRoute, appStorage.getIds.eventIdAndEmail());
  if (to && (to.meta.afterEventChosen || to.meta.alwaysAllowed)) {
    final = to.path;
  } else if (lastRoute) {
    final = lastRoute;
  } else {
    final = ROUTES.start.path;
  }
  return final;
};

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
          .then(userData => performSignInActions(context, userData)
            .then((result) => {
              if (!result) {
                const invitationKey = urlUtils.getInvitationKey();
                if (invitationKey) {
                  router.push({
                    name: ROUTES.joinEvent.name,
                    query: { invitationKey },
                  });

                } else {
                  console.log('signIn chose route', ROUTES.eventsList.path);
                  router.push(ROUTES.eventsList.path);
                }

              } else {
                autoUpdate.run();
                const redirectPath = redirectAfterEnterEvent();
                console.log('signIn chose route', redirectPath);

                router.push(redirectPath);
              }
              resolve(true);
            }),
          ).catch(reject);
      });
    },
    checkoutSession: function (context, to: RouteLocationNormalized) {
      return new Promise((resolve, reject) => {
        (api.checkYourLoginSession() as Promise<User>)
          .then(userData => {
            return performSignInActions(context, userData).then(result => {
              if (!result) {
                const invitationKey = urlUtils.getInvitationKey();
                if (invitationKey) {
                  return resolve({
                    name: ROUTES.joinEvent.name,
                    query: { invitationKey },
                  });
                } else {
                  console.log('Checkout session decide to', ROUTES.eventsList.path);
                  resolve({ name: ROUTES.eventsList.name });
                }
              } else {
                autoUpdate.run();

                const redirectPath = redirectAfterEnterEvent(to);
                console.log('Checkout session decide to', redirectPath);

                return resolve(redirectPath);
              }
            });
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
