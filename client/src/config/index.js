import { styleManager } from 'utils/style-manager';
import uuidInit from 'utils/uuid';

export function initApp () {
  styleManager.init();
  uuidInit();
}
