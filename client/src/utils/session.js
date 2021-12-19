import { api } from 'api';
import { store } from 'store';

export const session = {
  tryLogin () {
    return new Promise(resolve => {
      api.checkYourLoginSession()
        .then(data => {
          console.log(data);
          return data;
        })
        .then(data => store.dispatch('user/signIn', data))
        .catch(() => undefined)
        .finally(() => resolve());
    });
  },
};
