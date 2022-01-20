import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router';
import { store } from 'store';
import { api } from 'api';
import { routes } from './routes';
import { versionCompatibility } from 'utils/version-compatibility';
import { ErrorMessage } from 'utils/error-message';
import { session } from 'utils/session';
import { promiseUtils } from 'utils/promise';
import { guardsUtils } from 'src/router/guards';
import { APP_BASE_URL } from 'config/app-env';
import { autoUpdate } from 'utils/auto-update';

let firstRun = true;

const router = createRouter({
  base: APP_BASE_URL,
  routes,
  history: createWebHistory(),
});

const clearEventWhenLeaveEventRoutes = (to) => {
  // TODO poor solution, it clears only eventId and should all data
  if (!to.meta.afterEventChosen) {
    autoUpdate.stop();
    store.commit('event/setId', null);
  }
};
router.beforeEach((to, from, next) => {
  clearEventWhenLeaveEventRoutes(to);
  let promise;
  if (firstRun) {
    firstRun = false;
    promise = makeFirstRun();
  } else {
    promise = Promise.resolve();
  }
  promise
    .catch((error) => {
      if (error instanceof ErrorMessage) error.showMessage();
      else console.error(error);
    })
    .finally(() => {
      redirectIfNotAuth(to, from, next);
      store.commit('menu/close');
    });
});

router.hardReload = function () {
  store.commit('increaseRouterId');
};

export default router;

function makeFirstRun () {
  return new Promise((resolve, reject) => {
    api.information()
      .then(versionCompatibility.check)
      .then(session.tryLogin)
      .then(resolve)
      .catch(reject)
      .finally(() => promiseUtils.timeout(1000))
      .finally(() => store.commit('setIsLoading', false));
  });
}

function redirectIfNotAuth (to, from, next) {
  const {
    checkGuards, getRedirectPath, guards: {
      isTheSameRoute, isLoginGuard, isAdminGuard, isObserverGuard, isEventChooseGuard,
    },
  } = guardsUtils;
  const redirectSomewhereElseGuards = [isObserverGuard, isAdminGuard, isLoginGuard, isEventChooseGuard];

  if (isTheSameRoute(from, to)) {
    next(false);
    return;
  }
  if (checkGuards(redirectSomewhereElseGuards, to.meta)) {
    next(getRedirectPath());
    return;
  }
  next();
}
