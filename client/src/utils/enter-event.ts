import { appStorage } from 'utils/storage';
import { store } from 'store';
import { autoUpdate } from 'utils/auto-update';
import router from 'src/router';
import { ROUTES } from 'config/routes-config';

export function enterEvent (role: string, eventId: string, nickname: string, teamId: string | null = null) {
  store.commit('event/setId', eventId);
  return store.dispatch('event/download', { eventId, teamId, role, nickname })
    .then(() => {
      autoUpdate.run();
      router.push(ROUTES.start.path).then(() => updateStorageAfterSuccessLogIn(eventId));
    });
}

export function updateStorageAfterSuccessLogIn (eventId: string) {
  appStorage.setItem(appStorage.appKeys.recentEvent, eventId, appStorage.getIds.email());
  // TODO Refactor guide;
  /*
  const isFirstLogIn = appStorage.getItem(appStorage.appKeys.firstLogin, appStorage.getIds.eventIdAndEmail()) === null;
  if (isFirstLogIn) {
    store.commit('guide/open');
    appStorage.setItem(appStorage.appKeys.firstLogin, true, appStorage.getIds.eventIdAndEmail());
  } */
}
