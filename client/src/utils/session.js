import { store } from 'store';

export const session = {
  tryLogin () {
    return new Promise(resolve => {
      store.dispatch('user/signIn', null)
        .catch(() => undefined)
        .finally(() => resolve());
    });
  },
};
