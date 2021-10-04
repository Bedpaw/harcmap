import Vue from 'vue';
import Router from 'vue-router';
import { store } from 'store';
import { api } from 'api';
import { routes } from './routes';
import { versionCompatibility } from 'utils/version-compatibility';
import { ErrorMessage } from 'utils/error-message';
import { session } from 'utils/session';
import { promiseUtils } from 'utils/promise';
import { guardsUtils } from 'src/router/guards';

let firstRun = true;

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
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
      isTheSameRoute, isLoginGuard, isAdminGuard, isAdminObserverGuard,
    },
  } = guardsUtils;
  const blockRedirectGuards = [isTheSameRoute];
  const redirectSomewhereElseGuards = [isAdminObserverGuard, isAdminGuard, isLoginGuard];

  if (checkGuards(blockRedirectGuards, to, from)) {
    next(false);
    return;
  }
  if (checkGuards(redirectSomewhereElseGuards, to, from)) {
    next(getRedirectPath());
    return;
  }
  next();
}
