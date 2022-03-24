import { store } from 'store';

export const session = {
  tryLogin (to) {
    return new Promise((resolve, reject) => {
      store.dispatch('user/checkoutSession', to)
        .then(resolve)
        .catch(reject);
    });
  },
};
