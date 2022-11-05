import { styleManager } from 'utils/style-manager';
import { initializeDevTools } from './dev-tools';
import { uuidInit } from 'utils/uuid';
import { initDateConfig } from 'config/date-config';
import { DEVELOPMENT_MODE } from 'config/app-env';
import { adaptStatusAndNavigationBarToApp } from 'config/adapt-status-bar-to-device';

export function initApp () {
  if (DEVELOPMENT_MODE)
    initializeDevTools();

  adaptStatusAndNavigationBarToApp({
    statusBar: true,
    navigationBar: false,
  });
  styleManager.init();
  uuidInit();
  initDateConfig();
}
