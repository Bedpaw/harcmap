const testEndpoint = require('../../../../tests/utils/test-endpoint');
const { ObjectId } = require('mongodb');

describe('/api/v1/events/:eventId/categories/:categoryId', () => {
  testEndpoint('/api/v1/events/300000000000000000000001/categories/700000000000000000000001', {
    description: 'Update category',
    signIn: {
      email: 'user6@harcmap.pl',
      password: 'Password1',
    },
    method: 'PUT',
    body: {
      send: {
        categoryName: 'Nowa nazwa',
      },
      expect: {
        success: true,
      },
    },
    expectInDb: {
      collectionName: 'categories',
      query: { _id: ObjectId('700000000000000000000001') },
      document: {
        '_id': expect.any(Object),
        'categoryName': 'Nowa nazwa',
        'eventId': ObjectId('300000000000000000000001'),
        'pointStrokeColor': '#00ff00',
        'pointFillColor': '#ff0000',
        'pointValue': 2,
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/300000000000000000000001/categories/700000000000000000000001', {
    description: 'Cannot update category if user have no permissions',
    method: 'PUT',
    signIn: {
      email: 'user3@harcmap.pl',
      password: 'Password1',
    },
    body: {
      send: {
        pointFillColor: '#ccc',
      },
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
    expectedStatus: 401,
    expectInDb: {
      collectionName: 'categories',
      query: { _id: ObjectId('700000000000000000000001') },
      document: {
        '_id': expect.any(Object),
        'categoryName': 'Kategoria 1',
        'eventId': ObjectId('300000000000000000000001'),
        'pointStrokeColor': '#00ff00',
        'pointFillColor': '#ff0000',
        'pointValue': 2,
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/300000000000000000000001/categories/700000000000000000000001', {
    description: 'Cannot update category if user is not authenticated',
    method: 'PUT',
    body: {
      send: {
        pointValue: 88,
      },
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
    expectedStatus: 401,
    expectInDb: {
      collectionName: 'categories',
      query: { _id: ObjectId('700000000000000000000001') },
      document: {
        '_id': expect.any(Object),
        'categoryName': 'Kategoria 1',
        'eventId': ObjectId('300000000000000000000001'),
        'pointStrokeColor': '#00ff00',
        'pointFillColor': '#ff0000',
        'pointValue': 2,
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/300000000000000000000001/categories/700000000000000000000001', {
    description: 'Return error for invalid sent data',
    signIn: {
      email: 'user1@harcmap.pl',
      password: 'Password1',
    },
    method: 'PUT',
    body: {
      send: {
        pointValue: 'ten',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: [
          '"pointValue" must be a number',
        ],
      },
    },
    expectedStatus: 400,
    expectInDb: {
      collectionName: 'categories',
      query: { _id: ObjectId('700000000000000000000001') },
      document: {
        '_id': expect.any(Object),
        'categoryName': 'Kategoria 1',
        'eventId': ObjectId('300000000000000000000001'),
        'pointStrokeColor': '#00ff00',
        'pointFillColor': '#ff0000',
        'pointValue': 2,
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/300000000000000000000002/categories/700000000000000000000005', {
    description: 'Delete category',
    signIn: {
      email: 'user4@harcmap.pl',
      password: 'Password1',
    },
    method: 'DELETE',
    body: {
      send: {},
      expect: {
        success: true,
      },
    },
    expectInDb: {
      collectionName: 'categories',
      query: { _id: ObjectId('700000000000000000000005') },
      document: null,
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/300000000000000000000001/categories/700000000000000000000001', {
    description: 'Cannot delete category if user have no permissions',
    method: 'DELETE',
    signIn: {
      email: 'user3@harcmap.pl',
      password: 'Password1',
    },
    body: {
      send: {},
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
    expectedStatus: 401,
    expectInDb: {
      collectionName: 'categories',
      query: { _id: ObjectId('700000000000000000000001') },
      document: {
        '_id': expect.any(Object),
        'categoryName': 'Kategoria 1',
        'eventId': ObjectId('300000000000000000000001'),
        'pointStrokeColor': '#00ff00',
        'pointFillColor': '#ff0000',
        'pointValue': 2,
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/300000000000000000000001/categories/700000000000000000000001', {
    description: 'Cannot delete category if user is not authenticated',
    method: 'DELETE',
    body: {
      send: {},
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
    expectedStatus: 401,
    expectInDb: {
      collectionName: 'categories',
      query: { _id: ObjectId('700000000000000000000001') },
      document: {
        '_id': expect.any(Object),
        'categoryName': 'Kategoria 1',
        'eventId': ObjectId('300000000000000000000001'),
        'pointStrokeColor': '#00ff00',
        'pointFillColor': '#ff0000',
        'pointValue': 2,
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/300000000000000000000001/categories/700000000000000000000001', {
    description: 'Return error for invalid sent data',
    signIn: {
      email: 'user1@harcmap.pl',
      password: 'Password1',
    },
    method: 'DELETE',
    body: {
      send: {
        pointValue: 'ten',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: [
          '"pointValue" is not allowed',
        ],
      },
    },
    expectedStatus: 400,
    expectInDb: {
      collectionName: 'categories',
      query: { _id: ObjectId('700000000000000000000001') },
      document: {
        '_id': expect.any(Object),
        'categoryName': 'Kategoria 1',
        'eventId': ObjectId('300000000000000000000001'),
        'pointStrokeColor': '#00ff00',
        'pointFillColor': '#ff0000',
        'pointValue': 2,
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/300000000000000000000001/categories/700000000000000000000001', {
    description: 'Cannot delete in use category',
    signIn: {
      email: 'user6@harcmap.pl',
      password: 'Password1',
    },
    method: 'DELETE',
    body: {
      send: {},
      expect: {
        error: 1212,
        message: 'cannot delete in use category',
      },
    },
    expectedStatus: 400,
    expectInDb: {
      collectionName: 'categories',
      query: { _id: ObjectId('700000000000000000000001') },
      document: {
        '_id': expect.any(Object),
        'categoryName': 'Kategoria 1',
        'eventId': ObjectId('300000000000000000000001'),
        'pointStrokeColor': '#00ff00',
        'pointFillColor': '#ff0000',
        'pointValue': 2,
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/300000000000000000000001/categories/700000000000000000000001', {
    description: 'Should return 500 status for others http methods',
    method: ['GET', 'POST', 'OPTIONS', 'PATCH'],
    expectedStatus: 500,
    body: {
      expect: {
        error: 1000,
        message: 'no schema',
      },
    },
  });
});
