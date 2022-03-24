import { createRouter, createWebHistory } from 'vue-router';
import { store } from 'store';
import { api } from 'api';
import { routes } from './routes';
import { versionCompatibility } from 'utils/version-compatibility';
import { session } from 'utils/session';
import { promiseUtils } from 'utils/promise';
import { guardsUtils } from 'src/router/guards';
import { APP_BASE_URL } from 'config/app-env';
import { autoUpdate } from 'utils/auto-update';
import { appStorage } from 'utils/storage';

let firstRun = true;

export const router = createRouter({
  base: APP_BASE_URL,
  routes,
  history: createWebHistory(),
});

const clearEventWhenLeaveEventRoutes = (to) => {
  if (!(to.meta.afterEventChosen || to.meta.alwaysAllowed)) {
    autoUpdate.stop();
    store.dispatch('resetState').then();
  }
};
router.beforeEach((to, from, next) => {
  console.log('Start routing', from.path, to.path);
  clearEventWhenLeaveEventRoutes(to);
  let promise;
  if (firstRun) {
    firstRun = false;
    promise = makeFirstRun(to);
  } else {
    promise = Promise.resolve();
  }
  promise
    .then(path => {
      if (path) {
        console.log('First run change path to:', path);
        next(path);
      } else {
        console.log('Not first run, check guards:', to.path);
        redirectIfNotAuth(to, from, next);
      }
    })
    .catch(() => {
      console.log('Catch error and check guards:');
      redirectIfNotAuth(to, from, next);
    })
    .finally(() => {
      store.commit('menu/close');
    });
});

router.hardReload = function () {
  store.commit('increaseRouterId');
};

export default router;

function makeFirstRun (to) {
  return new Promise((resolve, reject) => {
    api.information()
      .then(versionCompatibility.check)
      .then(() => session.tryLogin(to))
      .then(path => resolve(path))
      .catch(reject)
      .finally(() => promiseUtils.timeout(100))
      .finally(() => store.commit('setIsLoading', false));
  });
}

function redirectIfNotAuth (to, from, next) {
  const {
    checkGuards, getRedirectPath, guards: {
      isTheSameRoute, isLoginGuard, isAdminGuard, isObserverGuard, isEventChooseGuard, isTeamLeader,
    },
  } = guardsUtils;
  const redirectSomewhereElseGuards = [isTeamLeader, isObserverGuard, isAdminGuard, isLoginGuard, isEventChooseGuard];
  console.log('Guards started:');
  if (isTheSameRoute(from, to)) {
    console.log('Same route, no redirect');
    next(false);
    return;
  }
  if (checkGuards(redirectSomewhereElseGuards, to.meta)) {
    console.log('Guard blocked and redirect to:', getRedirectPath());
    next(getRedirectPath());
    return;
  }
  if (to.meta.afterEventChosen) {
    appStorage.setItem(appStorage.appKeys.lastRoute, to.path, appStorage.getIds.eventIdAndEmail());
  }
  console.log('Successful redirection to:', to.path);
  next();
}
