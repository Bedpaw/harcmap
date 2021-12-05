import { styleManager } from 'utils/style-manager';
import uuidInit from 'utils/uuid';
import { initializeDevTools } from './dev-tools';
import { initDateConfig } from 'config/date-config';
import { DEVELOPMENT_MODE } from 'config/app-env';

export function initApp () {
  if (DEVELOPMENT_MODE) {
    initializeDevTools();
  }
  styleManager.init();
  uuidInit();
  initDateConfig();
}
