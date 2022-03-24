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
router.beforeEach(async (to, from, next) => {
  console.log('Start routing', from.path, to.path);
  clearEventWhenLeaveEventRoutes(to);
  let promise;
  if (firstRun) {
    firstRun = false;
    promise = makeFirstRun(to);
  } else {
    promise = Promise.resolve({ isNotFirstRun: true });
  }
  promise
    .then(({ path, checkMeta, isNotFirstRun }) => {
      if (isNotFirstRun) return redirectIfNotAuth(to, from, next);
      if (path) return next(path);
      if (checkMeta) return checkMetaMethod ? redirectIfNotAuth(to, from, next) : next('/start');
    })
    .catch(() => redirectIfNotAuth(to, from, next))
    .finally(() => store.commit('menu/close'));

});

router.hardReload = function () {
  store.commit('increaseRouterId');
};

export default router;

const makeNewFirstRun = () => {
  return new Promise((resolve, reject) => {
    try {
      const userData = await signIn();
      if (inviteKey) {
        return resolve({ path: 'join-event' });
      }
      if (autoEnterToEvent && eventInEventsList) {
        const eventKey = userData.eventList.find();
        await fetchEventData(eventKey);
        resolve({ checkMeta: true });
      }

      return resolve({ path: 'eventsList' });
    } catch (e) {
      reject(e);
    }
  });
};

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
