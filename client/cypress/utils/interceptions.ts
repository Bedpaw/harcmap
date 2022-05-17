import { apiResources } from '../../data/api-resources';
import { fixtures } from './fixtures';
import { urls } from './urls';

interface CreateInterceptionData {
  resourcePath: string;
  role?: string;
  fixtureName: string;
  alias?: string;
}

const getFixture = ({ role, name }) => {
  if (!role) {
    return name;
  }
  return role + '/' + name;
};

const createInterception = (data: CreateInterceptionData) => {
  const fixture = getFixture({ role: data.role, name: data.fixtureName });
  const resourcePath = urls.withBackendPrefix(data.resourcePath);
  const response = Cypress.env('stubServer') ? { fixture } : undefined;

  return data.alias
    ? cy.intercept(resourcePath, response).as(data.alias)
    : cy.intercept(resourcePath, response);
};

const testId = '100000000000000000000001';

export const intercept = {
  auth: {
    signIn: (role) => createInterception({
      resourcePath: apiResources.auth.signIn,
      fixtureName: fixtures.auth.signIn,
      role,
      alias: 'signIn',
    }),
  },
  events: {
    getEventById: () => createInterception({
      resourcePath: apiResources.events.getEventById(testId),
      fixtureName: fixtures.events.getEventById,
    }),
    checkEvent: (role) => createInterception({
      resourcePath: apiResources.events.checkEvent,
      fixtureName: fixtures.events.checkEvent,
      role,
      alias: 'checkEvent',
    }),
    joinEvent: (role) => createInterception({
      resourcePath: apiResources.events.joinEvent,
      fixtureName: fixtures.events.joinEvent,
      role,
      alias: 'joinEvent',
    }),
  },
  teams: {
    getTeamByEventId: () => createInterception({
      resourcePath: apiResources.teams.getTeamByEventId(testId, testId),
      fixtureName: fixtures.teams.getTeamByEventId,
    }),
  },
  points: {
    collectPoint: (role, eventId = testId) => createInterception({
      resourcePath: apiResources.points.collectPoint(eventId),
      fixtureName: fixtures.points.collectPoint,
      role,
      alias: 'collectPoint',
    }),
    getPointsByEventId: () => createInterception({
      resourcePath: apiResources.points.getPointsByEventId(testId),
      fixtureName: fixtures.points.getPointsByEventId,
    }),
  },
  categories: {
    getCategoriesByEventId: () => createInterception({
      resourcePath: apiResources.categories.getCategoriesByEventId(testId),
      fixtureName: fixtures.categories.getCategoriesByEventId,
    }),
  },
  other: {
    checkVersion: () => createInterception({
      resourcePath: apiResources.other.checkVersion,
      fixtureName: fixtures.other.checkVersion,
    }),
  },
};
