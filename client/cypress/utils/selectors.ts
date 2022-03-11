const roles = {
  teamLeader: 'teamLeader',
  admin: 'admin',
  observer: 'observer',
  teamMember: 'teamMember',
  creator: 'creator',
};

const createUrl = (fragments: string[]): string => {
  return Cypress.env('backendServerRoot') + fragments.reduce((acc, curr) => {
    acc += curr + '/';
    return acc;
  }, '').slice(0, -1);
};
export const selectors = {
  buttons: {
    signInSubmit: 'sign-in-submit',
    enterEvent: (eventId) => `button-enter-event-${eventId}`,
    navigateToJoinEvent: 'navigate-to-join-event',
    navigateToCreateEvent: 'navigate-to-create-event',
    navigateToCheckResults: 'navigate-to-check-results',
    navigateToScoreboard: 'navigate-to-scoreboard',
    navigateToEditEvent: 'navigate-to-edit-event',
    navigateToSearchPoints: 'navigate-to-search-point',
    navigateToMap: 'navigate-to-map',
    collectPoint: 'collect-point',
  },
  inputs: {
    email: 'input-email',
    password: 'input-password',
    collectPoint: 'input-collect-point',
  },
};
export const ROUTES = {
  signIn: 'sign-in',
};

export const apiResources = {
  auth: {
    signUp: createUrl(['auth', 'sign-up']),
    signIn: createUrl(['auth', 'sign-in']),
    signOut: createUrl(['auth', 'sign-out']),
  },
  users: {
    getUsersList: createUrl(['users']),
    getUserById: (userId) => createUrl(['users', userId]),
  },
  events: {
    getEventById: (eventId) => createUrl(['events', eventId]),
  },
  points: {
    getPointsByEventId: (eventId) => createUrl(['events', eventId, 'points']),
    collectPoint: (eventId) => createUrl(['events', eventId, 'points', 'collect']),
  },
  categories: {
    getCategoriesByEventId: (eventId) => createUrl(['events', eventId, 'categories']),
  },
  teams: {
    getTeamsByEventId: (eventId) => createUrl(['events', eventId, 'teams']),
    getTeamByEventId: (eventId, teamId) => createUrl(['events', eventId, 'teams', teamId]),
  },
};
const getFixture = ({ role, name }) => {
  return role + '/' + name;
};
const testId = '100000000000000000000001';
export const intercept = {
  auth: {
    signIn: (fixtureInfo) => cy.intercept(apiResources.auth.signIn, { fixture: getFixture(fixtureInfo) }).as('signIn'),
  },
  events: {
    getEventById: () => cy.intercept(apiResources.events.getEventById(testId), { fixture: 'getEventById' }).as('getEvent'),
  },
  teams: {
    getTeamByEventId: () => cy.intercept(apiResources.teams.getTeamByEventId(testId, testId), { fixture: 'getTeamById' }).as('getTeam'),
  },
  points: {
    collectPoint: (pointKey, fixtureInfo) => cy.intercept(apiResources.points.collectPoint(testId), { fixture: getFixture(fixtureInfo) }).as('collectPoint'),
    getPointsByEventId: () => cy.intercept(apiResources.points.getPointsByEventId(testId), { fixture: 'getPointsById' }).as('getPoints'),
  },
  categories: {
    getCategoriesByEventId: () => cy.intercept(apiResources.categories.getCategoriesByEventId(testId), { fixture: 'getPointCategoriesByEventId' }).as('getPointCategories'),
  },
};
