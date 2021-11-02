// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ICONS } from '@dbetka/vue-material-icons';
import { AppRoute } from '../router/utils';
import { EnterPermission } from '../models/routes';

const enterPermissions: Record<string, EnterPermission> = {
  alwaysAllowed: {},
  beforeLogin: {
    onlyBeforeLogin: true,
  },
  eventChose: {
    requiredAuth: true,
  },
  auth: {
    requiredAuth: true,
  },
  adminObserver: {
    requiredAuth: true,
    adminOnly: true,
  },
  admin: {
    requiredAuth: true,
    adminOnly: true,
    unlimitedOnly: true,
  },
};

const beforeLoginRoutes = {
  welcome: {
    path: '/',
    name: 'welcome',
    icon: ICONS.sensor_door,
  },
  signIn: {
    name: 'signIn',
    icon: ICONS.login,
  },
  signUp: {
    name: 'signUp',
    icon: ICONS.how_to_reg,
  },
  activationDone: {
    name: 'activationDone',
    icon: ICONS.how_to_reg,
  },
  activationWrong: {
    name: 'activationWrong',
    icon: ICONS.how_to_reg,
  },
  remindPassword: {
    name: 'remindPassword',
    icon: ICONS.vpn_key,
  },
  changePassword: {
    path: '/user/remind',
    dynamicParam: 'key',
    name: 'changePassword',
    icon: ICONS.create,
  },
};
const authRoutes = {
  start: {
    name: 'start',
    icon: ICONS.home,
    hasShortLabel: true,
  },
  timeoutPoints: {
    name: 'timeoutPoints',
    icon: ICONS.watch_later,
    hasShortLabel: true,
  },
  collectPoint: {
    name: 'collectPoint',
    icon: ICONS.add,
    hasShortLabel: true,
  },
  collectedPoints: {
    name: 'collectedPoints',
    icon: ICONS.bar_chart,
  },
  map: {
    name: 'map',
    icon: ICONS.map,
    hasShortLabel: true,
  },
};

const adminObserverRoutes = {
  scoreboard: {
    name: 'scoreboard',
    icon: ICONS.bar_chart,
  },
  searchPoint: {
    name: 'searchPoint',
    icon: ICONS.search,
  },
  spectatorPanel: {
    name: 'spectatorPanel',
    icon: ICONS.settings,
    hasShortLabel: true,
  },
};

const adminRoutes = {
  adminPanel: {
    name: 'adminPanel',
    icon: ICONS.settings,
    hasShortLabel: true,
  },
  editEvent: {
    name: 'editEvent',
    icon: ICONS.event,
  },
  editPoint: {
    name: 'editPoint',
    dynamicParam: 'pointId',
    icon: ICONS.edit,
  },
  newPoint: {
    name: 'newPoint',
    icon: ICONS.add_location_alt,
  },
  usersList: {
    name: 'usersList',
    icon: ICONS.people,
  },
};

const choseEventRoutes = {
  newEvent: {
    name: 'newEvent',
    icon: ICONS.event,
  },
  eventsList: {
    name: 'eventsList',
    icon: ICONS.list,
  },
  joinEvent: {
    name: 'joinEvent',
    icon: ICONS.event,
  },
};

const alwaysAllowedRoutes = {
  error: {
    path: '*',
    name: 'error',
  },
  about: {
    name: 'about',
    icon: ICONS.emoji_objects,
  },
};

export const ROUTES = {
  ...AppRoute.createRoutes<keyof typeof alwaysAllowedRoutes>(alwaysAllowedRoutes, enterPermissions.alwaysAllowed),
  ...AppRoute.createRoutes<keyof typeof beforeLoginRoutes>(beforeLoginRoutes, enterPermissions.beforeLogin),
  ...AppRoute.createRoutes<keyof typeof choseEventRoutes>(choseEventRoutes, enterPermissions.eventChose),
  ...AppRoute.createRoutes<keyof typeof authRoutes>(authRoutes, enterPermissions.auth),
  ...AppRoute.createRoutes<keyof typeof adminObserverRoutes>(adminObserverRoutes, enterPermissions.adminObserver),
  ...AppRoute.createRoutes<keyof typeof adminRoutes>(adminRoutes, enterPermissions.admin),
};
