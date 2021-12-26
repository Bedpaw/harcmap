import Cookies from 'js-cookie';
import { ErrorMessage } from 'utils/error-message';
import { translator } from 'src/dictionary';
import { APP_VERSION } from 'config/app-env';

export const versionCompatibility = {
  check ({ appClientVersion }) {
    const cookieName = 'incompatible-version-after-reload';
    const cookie = Cookies.get(cookieName);
    const incompatibleVersionAfterReload = cookie ? JSON.parse(cookie) : false;
    if (appClientVersion !== APP_VERSION) {
      if (incompatibleVersionAfterReload === false) {
        Cookies.set(cookieName, true);
        window.location.reload();
      } else {
        throw new ErrorMessage(translator.t('error.incompatibleAppVersion'), { hard: true });
      }
    } else {
      Cookies.remove(cookieName);
    }
  },
};
