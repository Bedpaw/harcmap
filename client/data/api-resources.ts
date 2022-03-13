const createUrl = (fragments: string[]): string => {
  return fragments.reduce((acc, curr) => {
    acc += curr + '/';
    return acc;
  }, '').slice(0, -1);
};

export const apiResources = {
  auth: {
    signUp: createUrl(['auth', 'sign-up']),
    signIn: createUrl(['auth', 'sign-in']),
    signOut: createUrl(['auth', 'sign-out']),
  },
  users: {
    getUsersList: createUrl(['users']),
    getUserById: (userId: string) => createUrl(['users', userId]),
  },
  events: {
    getEventById: (eventId: string) => createUrl(['events', eventId]),
  },
  points: {
    getPointsByEventId: (eventId: string) => createUrl(['events', eventId, 'points']),
    collectPoint: (eventId: string) => createUrl(['events', eventId, 'points', 'collect']),
  },
  categories: {
    getCategoriesByEventId: (eventId: string) => createUrl(['events', eventId, 'categories']),
  },
  teams: {
    getTeamsByEventId: (eventId: string) => createUrl(['events', eventId, 'teams']),
    getTeamByEventId: (eventId: string, teamId: string) => createUrl(['events', eventId, 'teams', teamId]),
  },
  other: {
    checkVersion: createUrl(['information']),
  },
};
