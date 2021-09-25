import { store } from 'store';
import { ROUTES } from 'config/routes-config';

const isTheSameRoute = (to, from) => to === from;

const isAdminObserverGuard = (to, from) => {
  const isNotAdmin = permissions.checkIsAdmin() === false;
  const adminRequired = to.meta.adminOnly;

  return adminRequired && isNotAdmin;
};
const isAdminGuard = (to, from) => {
  const unlimitedOnly = to.meta.unlimitedOnly;
  const isLimitedUser = permissions.checkIsLimited();

  return unlimitedOnly && isLimitedUser;
};
const isLoginGuard = (to, from) => {
  const requireAuth = to.meta.requiredAuth;
  const isNotLogged = store.getters['user/isLogin'] === false;

  return requireAuth && isNotLogged;
};

const getRedirectPath = () => {
  const isLogIn = store.getters['user/isLogin'];
  const eventIsNotChoose = store.getters['event/eventId'] === '';
  if (!isLogIn) {
    return ROUTES.welcome.path;
  }
  if (eventIsNotChoose) {
    return ROUTES.eventsList.path;
  }
  return ROUTES.start.path;
};

const checkGuards = (guardsArray, to, from) => guardsArray.some(guard => guard(to, from));

export const guardsUtils = {
  getRedirectPath,
  checkGuards,
  guards: {
    isTheSameRoute,
    isLoginGuard,
    isAdminObserverGuard,
    isAdminGuard,
  },
};
