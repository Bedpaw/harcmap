import { api } from 'api';
import { autoLogin } from 'utils/dev-mode/auto-login';
import { httpService } from './http-service';
import * as dayjs from 'dayjs';

export function initializeDevTools () {
  console.log(APP_NAME + ' v' + VERSION + ' in development mode');
  window.devTools = {
    api,
    autoLogin,
    httpService,
    dayjs,
  };
}
