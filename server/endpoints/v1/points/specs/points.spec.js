const testEndpoint = require('../../../../tests/utils/test-endpoint');

describe('/api/v1/events/60e6cc2eaa95cc33d7c46701/points', () => {
  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/points', {
    description: 'Return all points data for event 60e6cc2eaa95cc33d7c46701',
    method: 'GET',
    signIn: {
      email: 'example@domain.com',
      password: 'Password1',
    },
    body: {
      expect: [{
        pointCategoryId: '60e7046eaa95cc33d7c4672b',
        pointCollectedDate: null,
        pointDuration: {
          endDate: null,
          startDate: null,
        },
        pointId: '60e6d13faa95cc33d7c4671b',
        pointKey: 'ab12',
        pointName: 'Point name',
        pointPosition: {
          latitude: 1,
          longitude: 1,
        },
        pointType: 'permanent',
      }, {
        pointCategoryId: '60e7046eaa95cc33d7c4672b',
        pointCollectedDate: 34523416,
        pointDuration: {
          endDate: null,
          startDate: null,
        },
        pointId: '60e6d13faa95cc33d7c467aa',
        pointKey: 'wg53',
        pointName: 'Point second',
        pointPosition: {
          latitude: 1,
          longitude: 1,
        },
        pointType: 'permanent',
      }],
    },
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/points', {
    description: 'Return all points data for event 60e6cc2eaa95cc33d7c46701 for other user',
    method: 'GET',
    signIn: {
      email: 'quest@google.com',
      password: 'Password1',
    },
    body: {
      expect: [{
        pointCategoryId: '60e7046eaa95cc33d7c4672b',
        pointCollectedDate: null,
        pointDuration: {
          endDate: null,
          startDate: null,
        },
        pointId: '60e6d13faa95cc33d7c4671b',
        pointKey: null,
        pointName: 'Point name',
        pointPosition: {
          latitude: 1,
          longitude: 1,
        },
        pointType: 'permanent',
      }, {
        pointCategoryId: '60e7046eaa95cc33d7c4672b',
        pointCollectedDate: 34523416,
        pointDuration: {
          endDate: null,
          startDate: null,
        },
        pointId: '60e6d13faa95cc33d7c467aa',
        pointKey: null,
        pointName: 'Point second',
        pointPosition: {
          latitude: 1,
          longitude: 1,
        },
        pointType: 'permanent',
      }],
    },
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/points', {
    description: 'Dont return data for user that dont participle in 60e6cc2eaa95cc33d7c46701 event ',
    method: 'GET',
    signIn: {
      email: 'admin@harcmap.com',
      password: 'Password1',
    },
    expectedStatus: 401,
    body: {
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/points', {
    description: 'Dont points return data if user is not authenticated',
    method: 'GET',
    expectedStatus: 401,
    body: {
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/points', {
    description: 'Should add point for event 60e6cc2eaa95cc33d7c46701',
    method: 'POST',
    signIn: {
      email: 'example@domain.com',
      password: 'Password1',
    },
    body: {
      send: {
        pointCategoryId: '60e7046eaa95cc33d7c4672b',
        pointDuration: {
          endDate: 2,
          startDate: 1,
        },
        pointName: 'UniquePointName',
        pointPosition: {
          latitude: 1,
          longitude: 1,
        },
        pointType: 'permanent',
      },
      expect: {
        pointCategoryId: '60e7046eaa95cc33d7c4672b',
        pointCollectedDate: null,
        pointKey: expect.any(String),
        pointDuration: {
          endDate: 2,
          startDate: 1,
        },
        pointId: expect.any(String),
        pointName: 'UniquePointName',
        pointPosition: {
          latitude: 1,
          longitude: 1,
        },
        pointType: 'permanent',
      },
      expectInDb: {
        collectionName: 'points',
        query: { pointName: 'UniquePointName' },
        document: {
          _id: expect.any(Object),
          pointCategoryId: '60e7046eaa95cc33d7c4672b',
          pointCollectedDate: null,
          pointKey: expect.any(String),
          pointDuration: {
            endDate: 2,
            startDate: 1,
          },
          pointName: 'UniquePointName',
          pointPosition: {
            latitude: 1,
            longitude: 1,
          },
          pointType: 'permanent',
        },
      },
      resetDbToDefault: true,
    },
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/points', {
    description: 'User without administrator permissions cannot add new point',
    method: 'POST',
    signIn: {
      email: 'quest@google.com',
      password: 'Password1',
    },
    expectedStatus: 401,
    body: {
      send: {
        pointCategoryId: '60e7046eaa95cc33d7c4672b',
        pointDuration: {
          endDate: 2,
          startDate: 1,
        },
        pointName: 'Point name',
        pointPosition: {
          latitude: 1,
          longitude: 1,
        },
        pointType: 'permanent',
      },
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/points', {
    description: 'Should return error for incorrect input data',
    method: 'POST',
    signIn: {
      email: 'example@domain.com',
      password: 'Password1',
    },
    expectedStatus: 400,
    body: {
      send: {
        pointDuration: {
          endDate: 2,
          startDate: 1,
        },
        pointName: 'Point name',
        pointPosition: {
          latitude: 1,
          longitude: 1,
        },
        pointType: 'permanent',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: ['"pointCategoryId" is required'],
      },
    },
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/points', {
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
