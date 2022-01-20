import { appStorage } from 'utils/storage';

/**
 * @description
 * Sets "uuid"
 */
// TODO what is this?
function setUUID () {
  const uuidValue = appStorage.getItem(appStorage.appKeys.uuid);
  if (!uuidValue) {
    const newRandomValue = Math.round(Math.random() * 10e5) + '_' + Date.now();
    appStorage.setItem(appStorage.appKeys.uuid, newRandomValue);
  }
}

export default setUUID;
