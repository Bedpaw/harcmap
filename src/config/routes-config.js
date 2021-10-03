import { AppRoute } from 'src/router/utils';
import { ICONS } from '@dbetka/vue-material-icons';

const enterPermissions = {
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
    icons: ICONS.edit,
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

export const ROUTES = {
  ...AppRoute.createRoutes(beforeLoginRoutes, enterPermissions.beforeLogin),
  ...AppRoute.createRoutes(choseEventRoutes, enterPermissions.eventChose),
  ...AppRoute.createRoutes(authRoutes, enterPermissions.auth),
  ...AppRoute.createRoutes(adminObserverRoutes, enterPermissions.adminObserver),
  ...AppRoute.createRoutes(adminRoutes, enterPermissions.admin),
  error: new AppRoute({
    path: '*',
    name: 'error',
    enterPermission: enterPermissions.alwaysAllowed,
  }),
  about: new AppRoute({
    name: 'about',
    icon: ICONS.emoji_objects,
    enterPermissions: enterPermissions.alwaysAllowed,
  }),
};
