import { createRouter, createWebHistory } from 'vue-router';
import { store } from 'store';
import { api } from 'api';
import { routes } from './routes';
import { versionCompatibility } from 'utils/version-compatibility';
import { guardsUtils } from 'src/router/guards';
import { APP_BASE_URL } from 'config/app-env';
import { autoUpdate } from 'utils/auto-update';
import { appStorage } from 'utils/storage';
import { urlUtils } from 'utils/url';
import { ROUTES } from 'config/routes-config';

let firstRun = true;

export const router = createRouter({
  base: APP_BASE_URL,
  routes,
  history: createWebHistory(),
});

const isEventOrAlwaysAllowedRoute = (to) => {
  return !!(to.meta.afterEventChosen || to.meta.alwaysAllowed);
};

const clearEventDataWhenLeaveEventRoutes = (to) => {
  if ((isEventOrAlwaysAllowedRoute(to)) === false) {
    autoUpdate.stop();
    store.dispatch('resetState').then();
  }
};

router.beforeEach(async (to, from, next) => {
  // console.log('Start routing', from.path, to.path);

  let promise;
  if (firstRun) {
    firstRun = false;
    promise = makeFirstRun();
  } else {
    clearEventDataWhenLeaveEventRoutes(to);
    promise = Promise.resolve({ isNotFirstRun: true });
  }

  try {
    const { path, wantsEnterEvent } = await promise;
    if (wantsEnterEvent && isEventOrAlwaysAllowedRoute(to) === false) {
      return next(ROUTES.start.path);
    }
    if (path && path !== to.path) {
      return next(path);
    }
    checkRouteGuards(to, from, next);
  } catch (e) {
    checkRouteGuards(to, from, next);
  } finally {
    store.commit('setIsLoading', false);
    store.commit('menu/close');
  }
});

router.hardReload = function () {
  store.commit('increaseRouterId');
};

export default router;

const makeFirstRun = async () => {
  const apiInfo = await api.information();
  versionCompatibility.check(apiInfo);

  const userData = await store.dispatch('user/checkoutSession');
  return await postSignInActions(userData);
};

export async function postSignInActions (userData) {
  // Invitation key user journey
  const invitationKey = urlUtils.getInvitationKey();
  if (invitationKey) {
    return {
      path: {
        name: ROUTES.joinEvent.name,
        query: { invitationKey },
      },
    };
  }

  // Log into event user journey
  const wantsAutoLoginToEvent = appStorage.getItem(appStorage.appKeys.wantsAutoLoginToEvent, appStorage.getIds.email());
  const recentEventId = appStorage.getItem(appStorage.appKeys.recentEvent, appStorage.getIds.email());

  if (recentEventId && wantsAutoLoginToEvent) {
    const recentEvent = userData.userEvents.find(event => event.eventId === recentEventId);
    if (recentEvent) {
      await store.dispatch('event/download', recentEvent);
      return { wantsEnterEvent: true };
    }
  }

  // Default user journey
  return { path: ROUTES.eventsList.path };

}

function checkRouteGuards (to, from, next) {
  const {
    checkGuards, getRedirectPath, guards: {
      isTheSameRoute, isLoginGuard, isAdminGuard, isObserverGuard, isEventChooseGuard, isTeamLeader,
    },
  } = guardsUtils;
  const redirectSomewhereElseGuards = [isTeamLeader, isObserverGuard, isAdminGuard, isLoginGuard, isEventChooseGuard];
  // console.log('Guards started:');
  if (isTheSameRoute(from, to)) {
    // console.log('Same route, no redirect');
    next(false);
    return;
  }
  if (checkGuards(redirectSomewhereElseGuards, to.meta)) {
    // console.log('Guard blocked and redirect to:', getRedirectPath());
    next(getRedirectPath());
    return;
  }
  // console.log('Successful redirection to:', to.path);
  next();
}
