const testEndpoint = require('../../../../tests/utils/test-endpoint');

describe('/api/v1/events/:eventId/categories', () => {
  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/categories', {
    description: 'Return categories list for event',
    method: 'GET',
    body: {
      expect: [{
        _id: '60e7046eaa95cc33d7c4672b',
        categoryName: 'red',
        pointShape: 'dot',
        pointValue: 2,
      }, {
        _id: '60e7046eaa15cc33d7c4672b',
        categoryName: 'red',
        pointShape: 'dot',
        pointValue: 2,
      }],
    },
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/categories', {
    description: 'Should return 500 status for others http methods',
    method: ['PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    expectedStatus: 500,
    body: {
      expect: {
        error: 1000,
        message: 'no schema',
      },
    },
  });
});
