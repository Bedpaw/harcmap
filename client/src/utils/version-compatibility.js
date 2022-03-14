import { ErrorMessage } from 'utils/error-message';
import { translator } from 'src/dictionary';
import { APP_VERSION } from 'config/app-env';
import { appStorage } from 'utils/storage';

export const versionCompatibility = {
  check ({ appClientVersion }) {
    const incompatibleVersionAfterReload = appStorage.getItem(appStorage.appKeys.incompatibleVersionAfterReload);
    if (appClientVersion !== APP_VERSION) {
      if (incompatibleVersionAfterReload === null) {
        appStorage.setItem(appStorage.appKeys.incompatibleVersionAfterReload, true);
        window.location.reload();
      } else {
        throw new ErrorMessage(translator.t('error.incompatibleAppVersion'), { hard: true });
      }
    } else {
      appStorage.removeItem(appStorage.appKeys.incompatibleVersionAfterReload);
    }
  },
};
