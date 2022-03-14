export const testSelectors = {
  buttons: {
    signInSubmit: 'sign-in-submit',
    enterEvent: (eventId: string) => `button-enter-event-${eventId}`,
    navigateToJoinEvent: 'navigate-to-join-event',
    navigateToCreateEvent: 'navigate-to-create-event',
    navigateToCheckResults: 'navigate-to-check-results',
    navigateToScoreboard: 'navigate-to-scoreboard',
    navigateToEditEvent: 'navigate-to-edit-event',
    navigateToSearchPoints: 'navigate-to-search-point',
    navigateToMap: 'navigate-to-map',
    collectPoint: 'collect-point',
    joinEventSubmit: 'join-event-submit',
    joinEventConfirmationSubmit: 'join-event-confirmation-submit',
  },
  inputs: {
    email: 'input-email',
    password: 'input-password',
    collectPoint: 'input-collect-point',
    invitationKey: 'input-invitation-key',
    teamName: 'input-team-name',
    nickname: 'input-nickname',
  },
};

const beforeLoginRoutes = {
  welcome: {
    path: '/',
    name: 'welcome',
  },
  signIn: {
    path: 'sign-in',
    name: 'signIn',
  },
  signUp: {
    path: 'sign-up',
    name: 'signUp',
  },
  activationDone: {
    name: 'activationDone',
  },
  activationWrong: {
    name: 'activationWrong',
  },
  remindPassword: {
    name: 'remindPassword',
  },
  changePassword: {
    path: '/user/remind',
    dynamicParam: 'key',
    name: 'changePassword',
  },
};
const choseEventRoutes = {
  start: {
    name: 'start',
    hasShortLabel: true,
  },
  timeoutPoints: {
    name: 'timeoutPoints',
    path: 'timeout-points',
    hasShortLabel: true,
  },
  collectedPoints: {
    name: 'collectedPoints',
    hasShortLabel: true,
  },
  map: {
    name: 'map',
    hasShortLabel: true,
  },
  teamView: {
    name: 'teamView',
  },
};

const teamLeaderRoutes = {
  collectPoint: {
    name: 'collectPoint',
    path: 'collect-point',
    hasShortLabel: true,
  },
};

const adminObserverRoutes = {
  scoreboard: {
    name: 'scoreboard',
  },
  searchPoint: {
    name: 'searchPoint',
  },
  spectatorPanel: {
    name: 'spectatorPanel',
    hasShortLabel: true,
  },
};

const adminRoutes = {
  adminPanel: {
    name: 'adminPanel',
    path: 'admin-panel',
    hasShortLabel: true,
  },
  editEvent: {
    name: 'editEvent',
  },
  editPoint: {
    name: 'editPoint',
    dynamicParam: 'pointId',
  },
  newPoint: {
    name: 'newPoint',
  },
  newPointCategory: {
    name: 'newPointCategory',
  },
  editPointCategory: {
    name: 'editPointCategory',
    dynamicParam: 'pointCategoryId',
  },
  pointCategoriesList: {
    name: 'pointCategoriesList',
  },
  usersList: {
    name: 'usersList',
  },
};

const authRoutes = {
  newEvent: {
    name: 'newEvent',
    eventsList: {
      name: 'eventsList',
    },
    joinEvent: {
      name: 'joinEvent',
    },
  },
};

const alwaysAllowedRoutes = {
  error: {
    path: '/:pathMatch(.*)',
    name: 'error',
  },
  about: {
    name: 'about',
  },
};
export const Selectors = {
  adminObserverRoutes,
  alwaysAllowedRoutes,
  authRoutes,
  teamLeaderRoutes,
  beforeLoginRoutes,
  choseEventRoutes,
  adminRoutes,
};
