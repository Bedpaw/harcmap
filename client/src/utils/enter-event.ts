import { appStorage } from 'utils/storage';
import { store } from 'store';
import { autoUpdate } from 'utils/auto-update';
import { ROUTES } from 'config/routes-config';
import router from 'src/router';

export function enterEvent (role: string, eventId: string, teamId: string | null = null) {
  const lastRoute = appStorage.getItem(appStorage.appKeys.lastRoute, { ...appStorage.getIds.eventIdAndEmail(), eventId });
  store.dispatch('event/download', { eventId, teamId, role })
    .then(() => {
      autoUpdate.run();
      router.push(lastRoute ?? ROUTES.start.path).then(() => updateStorageAfterSuccessLogIn(eventId));
    })
    .catch(() => {
      store.dispatch('user/signOut').catch(() => undefined);
    });
}

function updateStorageAfterSuccessLogIn (eventId: string) {
  appStorage.setItem(appStorage.appKeys.recentEvent, eventId, appStorage.getIds.email());
  const isFirstLogIn = appStorage.getItem(appStorage.appKeys.firstLogin, appStorage.getIds.eventIdAndEmail()) === null;
  if (isFirstLogIn) {
    store.commit('guide/open');
    appStorage.setItem(appStorage.appKeys.firstLogin, true, appStorage.getIds.eventIdAndEmail());
  }
}
