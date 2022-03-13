import { appStorage } from 'utils/storage';
import { store } from 'store';
import { autoUpdate } from 'utils/auto-update';
import router from 'src/router';
import { RouteLocationNormalized } from 'vue-router';
import { ROUTES } from 'config/routes-config';

export function enterEvent (role: string, eventId: string, teamId: string | null = null, to?: RouteLocationNormalized) {
  store.commit('event/setId', eventId);
  store.dispatch('event/download', { eventId, teamId, role })
    .then(() => {
      autoUpdate.run();
      router.push(getRedirectPath(to)).then(() => updateStorageAfterSuccessLogIn(eventId));
    })
    .catch(() => {
      store.dispatch('user/signOut').catch(() => undefined);
    });
}
function getRedirectPath (to?: RouteLocationNormalized) {
  let final;
  const lastRoute = appStorage.getItem(appStorage.appKeys.lastRoute, appStorage.getIds.eventIdAndEmail());
  if (to && to.meta.afterEventChosen) {
    final = to.path;
  } else if (lastRoute) {
    final = lastRoute;
  } else {
    final = ROUTES.start.path;
  }
  return final;
}

function updateStorageAfterSuccessLogIn (eventId: string) {
  appStorage.setItem(appStorage.appKeys.recentEvent, eventId, appStorage.getIds.email());
  const isFirstLogIn = appStorage.getItem(appStorage.appKeys.firstLogin, appStorage.getIds.eventIdAndEmail()) === null;
  if (isFirstLogIn) {
    store.commit('guide/open');
    appStorage.setItem(appStorage.appKeys.firstLogin, true, appStorage.getIds.eventIdAndEmail());
  }
}
