import { eventController } from 'api/mock/event-controller';
import { userController } from 'api/mock/user-controller';
import { APP_VERSION } from 'config/app-env';

export function makeDelayFakeAnswer (method = () => undefined, timeout = 500) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(method());
    }, timeout);
  });
}
// function makeDelayError (timeout = 100) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject(new ErrorMessage(ERRORS.fakeErrorInMockApi));
//     }, 1000);
//   });
// }

export const mockApi = {
  ...eventController,
  ...userController,
  information () {
    const appVersion = APP_VERSION;
    return makeDelayFakeAnswer(() => ({
      appVersion,
    }));
  },
};
