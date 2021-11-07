import Cookies from 'js-cookie';
import { uCheck } from '@dbetka/utils';
import { MACROS } from 'utils/macros';

const cookieName = 'firstLogin';

export const firstLogin = {
  get state () {
    const cookie = Cookies.getJSON(cookieName);
    return uCheck.isDefined(cookie) ? cookie : true;
  },
  setCookie () {
    Cookies.remove(cookieName);
    Cookies.set(cookieName, false, { expires: MACROS.time.daysInYear });
  },
};
