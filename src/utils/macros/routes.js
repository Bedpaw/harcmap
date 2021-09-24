import { ICONS } from 'src/__jscash__/icons-names-list';
import { translator } from 'src/dictionary';

export class AppRoute {
  constructor ({
    name,
    enterPermissions,
    icon = ICONS.device_unknown,
    hasShortLabel = true,
    hasLabel = true,
    dynamicParam = null,
    path = null,
  }) {
    this.name = name;
    this.path = this.getPath(path, dynamicParam);
    this.label = this.getLabel(hasLabel);
    this.shortLabel = this.getShortLabel(hasShortLabel);
    this.icon = icon;
    this.meta = enterPermissions;
  }

  getPath (path, dynamicParam) {
    const camelToKebab = str => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
    let mainPath = path || '/' + camelToKebab(this.name);
    if (dynamicParam) {
      mainPath += '/:' + dynamicParam;
    }
    return mainPath;
  }

  getLabel (hasLabel) {
    return hasLabel ? translator.t(`title.${this.name}`) : '';
  }

  getShortLabel (hasShortLabel) {
    return hasShortLabel ? translator.t(`title.short.${this.name}`) : this.label;
  }

  static getDataForRouter (route) {
    return {
      path: route.path,
      name: route.name,
      meta: route.meta,
    };
  }
}

const enterPermissions = {
  alwaysAllowed: {
    onlyBeforeLogin: false,
    requiredAuth: false,
  },
  beforeLogin: {
    onlyBeforeLogin: true,
    requiredAuth: false,
  },
  eventChose: {
    onlyBeforeLogin: false,
    requiredAuth: true,
  },
  auth: {
    onlyBeforeLogin: false,
    requiredAuth: true,
  },
  adminObserver: {
    onlyBeforeLogin: false,
    requiredAuth: true,
    adminOnly: true,
  },
  admin: {
    onlyBeforeLogin: false,
    requiredAuth: true,
    adminOnly: true,
    unlimitedOnly: true,
  },
};

const beforeLoginRoutes = {
  welcome: new AppRoute({
    path: '/',
    name: 'welcome',
    icon: ICONS.sensor_door,
    enterPermission: enterPermissions.beforeLogin,
    hasShortLabel: false,
  }),
  signIn: new AppRoute({
    name: 'signIn',
    icon: ICONS.login,
    enterPermissions: enterPermissions.beforeLogin,
    hasShortLabel: false,
  }),
  signUp: new AppRoute({
    name: 'signUp',
    icon: ICONS.how_to_reg,
    enterPermissions: enterPermissions.beforeLogin,
    hasShortLabel: false,
  }),
  activationDone: new AppRoute({
    name: 'activationDone',
    icon: ICONS.how_to_reg,
    enterPermissions: enterPermissions.beforeLogin,
    hasShortLabel: false,
  }),
  activationWrong: new AppRoute({
    name: 'activationWrong',
    icon: ICONS.how_to_reg,
    enterPermissions: enterPermissions.beforeLogin,
    hasShortLabel: false,
  }),
  remindPassword: new AppRoute({
    name: 'remindPassword',
    icon: ICONS.vpn_key,
    enterPermissions: enterPermissions.beforeLogin,
    hasShortLabel: false,
  }),
  changePassword: new AppRoute({
    path: '/user/remind',
    dynamicParam: 'key',
    name: 'changePassword',
    icon: ICONS.create,
    enterPermissions: enterPermissions.beforeLogin,
    hasShortLabel: false,
  }),
};
const authRoutes = {
  start: new AppRoute({
    name: 'start',
    icon: ICONS.home,
    enterPermissions: enterPermissions.auth,
    hasShortLabel: false,
  }),
  timeoutPoints: new AppRoute({
    name: 'timeoutPoints',
    icon: ICONS.watch_later,
    enterPermissions: enterPermissions.auth,
  }),
  collectPoint: new AppRoute({
    name: 'collectPoint',
    icon: ICONS.add,
    enterPermissions: enterPermissions.auth,
  }),
  collectedPoints: new AppRoute({
    name: 'collectedPoints',
    icon: ICONS.bar_chart,
    enterPermissions: enterPermissions.auth,
  }),
  map: new AppRoute({
    name: 'map',
    icon: ICONS.map,
    enterPermissions: enterPermissions.auth,
    hasShortLabel: false,
  }),
};

const adminObserverRoutes = {
  scoreboard: new AppRoute({
    name: 'scoreboard',
    icon: ICONS.bar_chart,
    enterPermissions: enterPermissions.adminObserver,
  }),
  searchPoint: new AppRoute({
    name: 'searchPoint',
    icon: ICONS.search,
    enterPermissions: enterPermissions.adminObserver,
  }),
  spectatorPanel: new AppRoute({
    name: 'spectatorPanel',
    icon: ICONS.settings,
    enterPermissions: enterPermissions.adminObserver,
  }),
};

const adminRoutes = {
  adminPanel: new AppRoute({
    name: 'adminPanel',
    icon: ICONS.settings,
    enterPermissions: enterPermissions.admin,
  }),
  editEvent: new AppRoute({
    name: 'editEvent',
    icon: ICONS.event,
    enterPermissions: enterPermissions.admin,
  }),
  editPoint: new AppRoute({
    name: 'editPoint',
    dynamicParam: 'pointId',
    icons: ICONS.edit,
    enterPermissions: enterPermissions.admin,
    hasShortLabel: false,
  }),
  newPoint: new AppRoute({
    name: 'newPoint',
    icon: ICONS.add_location_alt,
    enterPermissions: enterPermissions.admin,
    hasShortLabel: false,
  }),
  usersList: new AppRoute({
    name: 'usersList',
    icon: ICONS.people,
    enterPermissions: enterPermissions.admin,
  }),
};

const choseEventRoutes = {
  newEvent: new AppRoute({
    name: 'newEvent',
    icon: ICONS.event,
    enterPermissions: enterPermissions.eventChose,
  }),
  eventsList: new AppRoute({
    name: 'eventsList',
    icon: ICONS.list,
    enterPermissions: enterPermissions.eventChose,
  }),
  joinEvent: new AppRoute({
    name: 'joinEvent',
    icon: ICONS.event,
    enterPermissions: enterPermissions.eventChose,
  }),
};

export const ROUTES = {
  ...beforeLoginRoutes,
  ...choseEventRoutes,
  ...authRoutes,
  ...adminObserverRoutes,
  ...adminRoutes,
  error: new AppRoute({
    path: '*',
    name: 'error',
    enterPermission: enterPermissions.alwaysAllowed,
  }),
  about: new AppRoute({
    name: 'about',
    icon: ICONS.emoji_objects,
    enterPermissions: enterPermissions.alwaysAllowed,
    hasShortLabel: false,
  }),
};
