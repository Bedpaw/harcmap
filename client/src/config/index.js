import { styleManager } from 'utils/style-manager';
import uuidInit from 'utils/uuid';
import { initializeDevTools } from './dev-tools';
import { initDateConfig } from 'config/date-config';

export function initApp () {
  if (PRODUCTION === false) {
    initializeDevTools();
  }
  styleManager.init();
  uuidInit();
  initDateConfig();
}
