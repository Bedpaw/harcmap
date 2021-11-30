const testEndpoint = require('../../../../tests/utils/test-endpoint');
const { ObjectId } = require('mongodb');

describe('/api/v1/events/:eventId/categories', () => {
  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/categories', {
    description: 'Return categories list for event',
    signIn: {
      password: 'Password1',
      email: 'example@domain.com',
    },
    method: 'GET',
    body: {
      expect: [{
        categoryId: '60e7046eaa95cc33d7c4672b',
        categoryName: 'red',
        pointShape: 'dot',
        pointValue: 2,
      }, {
        categoryId: '60e7046eaa15cc33d7c4672b',
        categoryName: 'green',
        pointShape: 'dot',
        pointValue: 1,
      }],
    },
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/categories', {
    description: 'Dont return categories list if user is not logged',
    method: 'GET',
    expectedStatus: 401,
    body: {
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/categories', {
    description: 'Create new category for event 60e6cc2eaa95cc33d7c46701',
    signIn: {
      password: 'Password1',
      email: 'example@domain.com',
    },
    method: 'POST',
    body: {
      send: {
        eventId: '60e6cc2eaa95cc33d7c46701',
        categoryName: 'yellow',
        pointValue: 9999,
        pointShape: 'circle',
      },
      expect: {
        categoryId: expect.any(String),
        categoryName: 'yellow',
        pointShape: 'circle',
        pointValue: 9999,
      },
    },
    expectInDb: {
      collectionName: 'categories',
      query: { pointValue: 9999 },
      document: {
        '_id': expect.any(Object),
        'categoryName': 'yellow',
        'eventId': ObjectId('60e6cc2eaa95cc33d7c46701'),
        'pointShape': 'circle',
        'pointValue': 9999,
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/categories', {
    description: 'Return error for invalid sent data',
    signIn: {
      password: 'Password1',
      email: 'example@domain.com',
    },
    method: 'POST',
    expectedStatus: 400,
    body: {
      send: {
        eventId: '60e6cc2eaa95cc33d7c46701',
        pointValue: 9998,
        pointShape: 'circle',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: [
          '"categoryName" is required',
        ],
      },
    },
    expectInDb: {
      collectionName: 'categories',
      query: { pointValue: 9998 },
      document: null,
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/categories', {
    description: 'Cannot create category if user is not authenticated',
    method: 'POST',
    expectedStatus: 401,
    body: {
      send: {
        eventId: '60e6cc2eaa95cc33d7c46701',
        categoryName: 'yellow',
        pointValue: 5,
        pointShape: 'circle',
      },
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/categories', {
    description: 'Cannot create category if user is have no permission in event',
    signIn: {
      email: 'quest@google.com',
      password: 'Password1',
    },
    method: 'POST',
    expectedStatus: 401,
    body: {
      send: {
        eventId: '60e6cc2eaa95cc33d7c46701',
        categoryName: 'yellow',
        pointValue: 5,
        pointShape: 'circle',
      },
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
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
