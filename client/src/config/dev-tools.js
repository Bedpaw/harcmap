import { api } from 'api';
import { autoLogin } from 'utils/dev-mode/auto-login';
import { httpService } from './http-service';
import * as dayjs from 'dayjs';
import { APP_NAME, APP_VERSION } from 'config/app-env';

export function initializeDevTools () {
  console.log(`${APP_NAME} v${APP_VERSION} in development mode`);
  window.devTools = {
    api,
    autoLogin,
    httpService,
    dayjs,
  };
}
