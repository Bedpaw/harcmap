import { store } from 'store';

export const session = {
  tryLogin (to) {
    return new Promise(resolve => {
      store.dispatch('user/signIn', to)
        .catch(() => undefined)
        .finally(() => resolve());
    });
  },
};
