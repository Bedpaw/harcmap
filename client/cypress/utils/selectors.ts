
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
  },
  inputs: {
    email: 'input-email',
    password: 'input-password',
  },
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
export const intercept = {
  auth: {
    signIn: (fixture) => cy.intercept(apiResources.auth.signIn, { fixture }).as('signIn'),
  },
  events: {
    getEventById: () => cy.intercept(apiResources.events.getEventById('100000000000000000000001'), { fixture: 'getEventById' }).as('getEvent'),
  },
  teams: {
    getTeamByEventId: () => cy.intercept(apiResources.teams.getTeamByEventId('100000000000000000000001', '100000000000000000000001'), { fixture: 'getTeamById' }).as('getTeam'),
  },
};
