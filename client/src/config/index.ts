import { styleManager } from 'utils/style-manager';
import { initializeDevTools } from './dev-tools';
import { uuidInit } from 'utils/uuid';
import { initDateConfig } from 'config/date-config';
import { DEVELOPMENT_MODE } from 'config/app-env';
import { adaptStatusBarToApp } from 'config/adapt-status-bar-to-device';

export function initApp () {
  if (DEVELOPMENT_MODE) {
    initializeDevTools();
  }
  adaptStatusBarToApp();
  styleManager.init();
  uuidInit();
  initDateConfig();
}
