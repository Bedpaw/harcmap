const testEndpoint = require('../../../../tests/utils/test-endpoint');

describe('/api/v1/events/300000000000000000000001/points', () => {
  testEndpoint('/api/v1/events/300000000000000000000001/points', {
    description: 'Return all points data for event 300000000000000000000001',
    method: 'GET',
    signIn: {
      email: 'user1@harcmap.pl',
      password: 'Password1',
    },
    body: {
      expect: [{
        'pointId': '600000000000000000000001',
        'pointKey': 'Poi1',
        'pointName': 'Punkt 1',
        'pointType': 'permanent',
        'pointCollectedDate': 1640991600000,
        'pointDuration': {
          'startDate': null,
          'endDate': null,
        },
        'pointPosition': {
          'longitude': 18.542,
          'latitude': 54.469,
        },
        'pointCategoryId': '700000000000000000000001',
        'pointDescription': 'Lorem ipsum dolor sit amet',
        'pointSuccessMessage': 'Lorem ipsum dolor sit amet',
      }, {
        'pointId': '600000000000000000000002',
        'pointKey': 'Poi2',
        'pointName': 'Point 2',
        'pointType': 'timeout',
        'pointCollectedDate': null,
        'pointDuration': {
          'startDate': 1610627574000,
          'endDate': 2525776374000,
        },
        'pointPosition': {
          'longitude': 18.543,
          'latitude': 54.47,
        },
        'pointCategoryId': '700000000000000000000002',
        'pointDescription': null,
        'pointSuccessMessage': null,
      }, {
        'pointId': '600000000000000000000003',
        'pointKey': 'Poi3',
        'pointName': null,
        'pointType': 'permanent',
        'pointCollectedDate': 1641178404000,
        'pointDuration': {
          'startDate': null,
          'endDate': null,
        },
        'pointPosition': {
          'longitude': 18.541,
          'latitude': 54.464,
        },
        'pointCategoryId': '700000000000000000000001',
        'pointDescription': 'Lorem ipsum dolor sit amet',
        'pointSuccessMessage': null,
      }, {
        'pointId': '600000000000000000000004',
        'pointKey': 'Poi4',
        'pointName': 'Punkt 4',
        'pointType': 'permanent',
        'pointCollectedDate': 1641138541000,
        'pointDuration': {
          'startDate': null,
          'endDate': null,
        },
        'pointPosition': {
          'longitude': 18.54,
          'latitude': 54.469,
        },
        'pointCategoryId': '700000000000000000000001',
        'pointDescription': null,
        'pointSuccessMessage': null,
      }, {
        'pointId': '600000000000000000000005',
        'pointKey': 'Poi5',
        'pointName': 'Punkt 5',
        'pointType': 'timeout',
        'pointCollectedDate': null,
        'pointDuration': {
          'startDate': 1610035962000,
          'endDate': 1641571962000,
        },
        'pointPosition': {
          'longitude': 18.548,
          'latitude': 54.473,
        },
        'pointCategoryId': '700000000000000000000002',
        'pointDescription': 'Lorem ipsum dolor sit amet',
        'pointSuccessMessage': null,
      }, {
        'pointId': '600000000000000000000006',
        'pointKey': 'Poi6',
        'pointName': null,
        'pointType': 'permanent',
        'pointCollectedDate': null,
        'pointDuration': {
          'startDate': null,
          'endDate': null,
        },
        'pointPosition': {
          'longitude': 18.545,
          'latitude': 54.466,
        },
        'pointCategoryId': '700000000000000000000003',
        'pointDescription': 'Lorem ipsum dolor sit amet',
        'pointSuccessMessage': 'Lorem ipsum dolor sit amet',
      }, {
        'pointId': '600000000000000000000007',
        'pointKey': 'Poi7',
        'pointName': 'Punkt 7',
        'pointType': 'timeout',
        'pointCollectedDate': null,
        'pointDuration': {
          'startDate': 1610035962000,
          'endDate': 2524636865000,
        },
        'pointPosition': {
          'longitude': 18.548,
          'latitude': 54.461,
        },
        'pointCategoryId': '700000000000000000000001',
        'pointDescription': 'Lorem ipsum dolor sit amet',
        'pointSuccessMessage': null,
      }],
    },
  });

  testEndpoint('/api/v1/events/300000000000000000000001/points', {
    description: 'Return all points data for event 300000000000000000000001 for other user',
    method: 'GET',
    signIn: {
      email: 'user4@harcmap.pl',
      password: 'Password1',
    },
    body: {
      expect: [{
        'pointId': '600000000000000000000001',
        'pointKey': null,
        'pointName': 'Punkt 1',
        'pointType': 'permanent',
        'pointCollectedDate': 1640991600000,
        'pointDuration': {
          'startDate': null,
          'endDate': null,
        },
        'pointPosition': {
          'longitude': 18.542,
          'latitude': 54.469,
        },
        'pointCategoryId': '700000000000000000000001',
        'pointDescription': 'Lorem ipsum dolor sit amet',
        'pointSuccessMessage': 'Lorem ipsum dolor sit amet',
      }, {
        'pointId': '600000000000000000000002',
        'pointKey': null,
        'pointName': 'Point 2',
        'pointType': 'timeout',
        'pointCollectedDate': null,
        'pointDuration': {
          'startDate': 1610627574000,
          'endDate': 2525776374000,
        },
        'pointPosition': {
          'longitude': 18.543,
          'latitude': 54.47,
        },
        'pointCategoryId': '700000000000000000000002',
        'pointDescription': null,
        'pointSuccessMessage': null,
      }, {
        'pointId': '600000000000000000000003',
        'pointKey': null,
        'pointName': null,
        'pointType': 'permanent',
        'pointCollectedDate': 1641178404000,
        'pointDuration': {
          'startDate': null,
          'endDate': null,
        },
        'pointPosition': {
          'longitude': 18.541,
          'latitude': 54.464,
        },
        'pointCategoryId': '700000000000000000000001',
        'pointDescription': 'Lorem ipsum dolor sit amet',
        'pointSuccessMessage': null,
      }, {
        'pointId': '600000000000000000000004',
        'pointKey': null,
        'pointName': 'Punkt 4',
        'pointType': 'permanent',
        'pointCollectedDate': 1641138541000,
        'pointDuration': {
          'startDate': null,
          'endDate': null,
        },
        'pointPosition': {
          'longitude': 18.54,
          'latitude': 54.469,
        },
        'pointCategoryId': '700000000000000000000001',
        'pointDescription': null,
        'pointSuccessMessage': null,
      }, {
        'pointId': '600000000000000000000005',
        'pointKey': null,
        'pointName': 'Punkt 5',
        'pointType': 'timeout',
        'pointCollectedDate': null,
        'pointDuration': {
          'startDate': 1610035962000,
          'endDate': 1641571962000,
        },
        'pointPosition': {
          'longitude': 18.548,
          'latitude': 54.473,
        },
        'pointCategoryId': '700000000000000000000002',
        'pointDescription': 'Lorem ipsum dolor sit amet',
        'pointSuccessMessage': null,
      }, {
        'pointId': '600000000000000000000006',
        'pointKey': null,
        'pointName': null,
        'pointType': 'permanent',
        'pointCollectedDate': null,
        'pointDuration': {
          'startDate': null,
          'endDate': null,
        },
        'pointPosition': {
          'longitude': 18.545,
          'latitude': 54.466,
        },
        'pointCategoryId': '700000000000000000000003',
        'pointDescription': 'Lorem ipsum dolor sit amet',
        'pointSuccessMessage': 'Lorem ipsum dolor sit amet',
      }, {
        'pointId': '600000000000000000000007',
        'pointKey': null,
        'pointName': 'Punkt 7',
        'pointType': 'timeout',
        'pointCollectedDate': null,
        'pointDuration': {
          'startDate': 1610035962000,
          'endDate': 2524636865000,
        },
        'pointPosition': {
          'longitude': 18.548,
          'latitude': 54.461,
        },
        'pointCategoryId': '700000000000000000000001',
        'pointDescription': 'Lorem ipsum dolor sit amet',
        'pointSuccessMessage': null,
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

  testEndpoint('/api/v1/events/300000000000000000000001/points', {
    description: 'Should add point for event 300000000000000000000001',
    method: 'POST',
    signIn: {
      email: 'user1@harcmap.pl',
      password: 'Password1',
    },
    body: {
      send: {
        pointCategoryId: '700000000000000000000002',
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
        pointDescription: 'Lorem ipsum dolor sit amet',
      },
      expect: {
        pointCategoryId: '700000000000000000000002',
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
        pointDescription: 'Lorem ipsum dolor sit amet',
        pointSuccessMessage: null,
      },
      expectInDb: {
        collectionName: 'points',
        query: { pointName: 'UniquePointName' },
        document: {
          _id: expect.any(Object),
          pointCategoryId: '700000000000000000000002',
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
          pointDescription: 'Lorem ipsum dolor sit amet',
          pointSuccessMessage: null,
        },
      },
      resetDbToDefault: true,
    },
  });

  testEndpoint('/api/v1/events/300000000000000000000001/points', {
    description: 'User without administrator permissions cannot add new point',
    method: 'POST',
    signIn: {
      email: 'user3@harcmap.pl',
      password: 'Password1',
    },
    expectedStatus: 401,
    body: {
      send: {
        pointCategoryId: '300000000000000000000001',
        pointDuration: {
          endDate: 2,
          startDate: 1,
        },
        pointName: 'NewPoint2',
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
    expectInDb: {
      collectionName: 'points',
      query: { pointName: '{' },
      document: null,
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/300000000000000000000001/points', {
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

  testEndpoint('/api/v1/events/300000000000000000000001/points', {
    description: 'Should return 500 status for others http methods',
    method: ['PUT', 'DELETE', 'PATCH'],
    expectedStatus: 500,
    body: {
      expect: {
        error: 1000,
        message: 'no schema',
      },
    },
  });
});
