const testEndpoint = require('../../../../tests/utils/test-endpoint');
const endpoint = '/api/v1/about';

// mock server package.json
jest.mock('../../../../package.json', () => ({
  version: '1.2.3',
}), { virtual: true });

// mock main app package.json
jest.mock('../../../../../package.json', () => ({
  version: '2.3.4',
  author: 'harcmapTeam',
  name: 'harcmap',
}), { virtual: true });

// mock client package.json
jest.mock('../../../../../client/package.json', () => ({
  version: '3.4.5',
}), { virtual: true });

describe(endpoint, () => {
  testEndpoint(endpoint, {
    description: 'Return information about application (frontend, backend)',
    method: 'GET',
    body: {
      expect: {
        appName: 'harcmap',
        author: 'harcmapTeam',
        version: '2.3.4',
        appClientVersion: '3.4.5',
        appServerVersion: '1.2.3',
      },
    },
  });

  testEndpoint(endpoint, {
    description: 'Should return 500 status for others http methods',
    method: ['POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    expectedStatus: 500,
    body: {
      expect: {
        error: 1000,
        message: 'no schema',
      },
    },
  });
});
