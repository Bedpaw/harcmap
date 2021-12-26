/* eslint-disable @typescript-eslint/no-unused-vars */
import { store } from 'store';
import { ROUTES } from 'config/routes-config';
import { permissions } from 'utils/permissions';
import { EnterPermissionOptions } from 'models/routes';
import { RouteLocationRaw } from 'vue-router';

const isTheSameRoute = (to: RouteLocationRaw, from: RouteLocationRaw) => to === from;

const isObserverGuard = (enterPermissions: EnterPermissionOptions) => {
  const isNotObserver = !permissions.checkIsObserver();
  const observerRequired = enterPermissions.observer;

  return observerRequired && isNotObserver;
};

const isAdminGuard = (enterPermissions: EnterPermissionOptions) => {
  const isNotAdmin = !permissions.checkIsAdmin();
  const adminOnly = enterPermissions.admin;

  return adminOnly && isNotAdmin;
};

const isTeamLeader = (enterPermissions: EnterPermissionOptions) => {
  const isNotTeamLeader = !permissions.checkIsTeamLeader();
  const teamLeaderOnly = enterPermissions.teamLeader;

  return teamLeaderOnly && isNotTeamLeader;
};

const isLoginGuard = (enterPermissions: EnterPermissionOptions) => {
  const isNotLogged = store.getters['user/isLogin'] === false;
  const loggedOnly = enterPermissions.afterLogin;

  return loggedOnly && isNotLogged;
};

const isEventChooseGuard = (enterPermissions: EnterPermissionOptions) => {
  const eventNotChosen = store.getters['event/eventId'] === null;
  const requireEventChosen = enterPermissions.afterEventChosen;

  return requireEventChosen && eventNotChosen;
};

const getRedirectPath = (): string => {
  const isNotLogIn = store.getters['user/isLogin'] === false;
  const eventNotChosen = store.getters['event/eventId'] === null;

  if (isNotLogIn) {
    return ROUTES.welcome.path;
  }
  if (eventNotChosen) {
    return ROUTES.eventsList.path;
  }
  return ROUTES.start.path;
};

const checkGuards = (guardsArray: ((enterPermissions: EnterPermissionOptions) => boolean)[], enterPermission: EnterPermissionOptions) =>
  guardsArray.some(guard => guard(enterPermission));

export const guardsUtils = {
  getRedirectPath,
  checkGuards,
  guards: {
    isTheSameRoute,
    isLoginGuard,
    isTeamLeader,
    isObserverGuard,
    isAdminGuard,
    isEventChooseGuard,
  },
};
