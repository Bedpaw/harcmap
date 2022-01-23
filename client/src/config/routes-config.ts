import { AppRoute } from '../router/utils';
import { EnterPermissionGroup } from 'models/routes';
import { materialIcons } from '@dbetka/vue-material-icons';

const ICONS = materialIcons.names;

const enterPermissions: EnterPermissionGroup = {
  alwaysAllowed: {},
  beforeLogin: {
    beforeLogin: true,
  },
  afterLogin: {
    afterLogin: true,
  },
  afterEventChosen: {
    afterLogin: true,
    afterEventChosen: true,
  },
  teamLeader: {
    afterLogin: true,
    afterEventChosen: true,
    teamLeader: true,
  },
  adminObserver: {
    afterLogin: true,
    afterEventChosen: true,
    observer: true,
  },
  admin: {
    afterLogin: true,
    afterEventChosen: true,
    observer: true,
    admin: true,
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
    path: '/sign-up',
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
const choseEventRoutes = {
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
  collectedPoints: {
    name: 'collectedPoints',
    icon: ICONS.bar_chart,
    hasShortLabel: true,
  },
  map: {
    name: 'map',
    icon: ICONS.map,
    hasShortLabel: true,
  },
  teamView: {
    name: 'teamView',
    icon: ICONS.people,
  },
};

const teamLeaderRoutes = {
  collectPoint: {
    name: 'collectPoint',
    icon: ICONS.add,
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
  shareEvent: {
    name: 'shareEvent',
    icon: ICONS.share,
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
  newPointCategory: {
    name: 'newPointCategory',
    icon: ICONS.add,
  },
  editPointCategory: {
    name: 'editPointCategory',
    icon: ICONS.edit,
    dynamicParam: 'pointCategoryId',
  },
  pointCategoriesList: {
    name: 'pointCategoriesList',
    icon: ICONS.list,
  },
  usersList: {
    name: 'usersList',
    icon: ICONS.people,
  },
};

const authRoutes = {
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
    path: '/:pathMatch(.*)',
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
  ...AppRoute.createRoutes<keyof typeof choseEventRoutes>(choseEventRoutes, enterPermissions.afterEventChosen),
  ...AppRoute.createRoutes<keyof typeof authRoutes>(authRoutes, enterPermissions.afterLogin),
  ...AppRoute.createRoutes<keyof typeof teamLeaderRoutes>(teamLeaderRoutes, enterPermissions.teamLeader),
  ...AppRoute.createRoutes<keyof typeof adminObserverRoutes>(adminObserverRoutes, enterPermissions.adminObserver),
  ...AppRoute.createRoutes<keyof typeof adminRoutes>(adminRoutes, enterPermissions.admin),
};
