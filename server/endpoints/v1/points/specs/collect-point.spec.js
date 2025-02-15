const testEndpoint = require('../../../../tests/utils/test-endpoint');
const { ObjectId } = require('mongodb');

describe('/api/v1/events/300000000000000000000002/points/collect', () => {
  testEndpoint('/api/v1/events/300000000000000000000002/points/collect', {
    description: 'Collect point from event 300000000000000000000002',
    method: 'POST',
    signIn: {
      email: 'user7@harcmap.pl',
      password: 'Password1',
    },
    body: {
      send: {
        pointKey: 'Poi8',
      },
      expect: {
        'pointId': '600000000000000000000008',
        'pointName': null,
        'pointType': 'permanent',
        'pointCollectedDate': expect.any(Number),
        'pointDuration': {
          'startDate': null,
          'endDate': null,
        },
        'pointPosition': {
          'longitude': 18.54,
          'latitude': 54.46,
        },
        'pointCategoryId': '700000000000000000000004',
        'pointDescription': 'Lorem ipsum dolor sit amet',
        'pointSuccessMessage': 'Lorem ipsum dolor sit amet',
      },
    },
    expectInDb: [{
      collectionName: 'points',
      query: { _id: ObjectId('600000000000000000000008') },
      document: {
        _id: ObjectId('600000000000000000000008'),
        eventId: ObjectId('300000000000000000000002'),
        pointCategoryId: ObjectId('700000000000000000000004'),
        pointCollectedDate: expect.any(Number),
        pointKey: expect.any(String),
        pointDuration: {
          endDate: null,
          startDate: null,
        },
        pointName: null,
        pointPosition: {
          latitude: 54.46,
          longitude: 18.54,
        },
        pointType: 'permanent',
        pointDescription: 'Lorem ipsum dolor sit amet',
        pointSuccessMessage: 'Lorem ipsum dolor sit amet',
      },
    }, {
      collectionName: 'teams',
      query: { _id: ObjectId('400000000000000000000003') },
      document: {
        _id: ObjectId('400000000000000000000003'),
        eventId: ObjectId('300000000000000000000002'),
        teamName: 'Team 3',
        teamColor: '#7308A5',
        collectedPoints: [ObjectId('600000000000000000000008')],
      },
    }, {
      collectionName: 'teams',
      query: { _id: ObjectId('400000000000000000000002') },
      document: {
        _id: ObjectId('400000000000000000000002'),
        eventId: ObjectId('300000000000000000000001'),
        teamName: 'Team 2',
        teamColor: '#777777',
        collectedPoints: [ObjectId('600000000000000000000004')],
      },
    }],
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/300000000000000000000002/points/collect', {
    description: 'Shouldn\'t collect point if user have no permissions',
    method: 'POST',
    expectedStatus: 401,
    signIn: {
      email: 'user8@harcmap.pl',
      password: 'Password1',
    },
    body: {
      send: {
        pointKey: 'Poi8',
      },
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
    expectInDb: [{
      collectionName: 'points',
      query: { _id: ObjectId('600000000000000000000008') },
      document: {
        _id: ObjectId('600000000000000000000008'),
        eventId: ObjectId('300000000000000000000002'),
        pointCategoryId: ObjectId('700000000000000000000004'),
        pointCollectedDate: null,
        pointKey: expect.any(String),
        pointDuration: {
          endDate: null,
          startDate: null,
        },
        pointName: null,
        pointPosition: {
          latitude: 54.46,
          longitude: 18.54,
        },
        pointType: 'permanent',
        pointDescription: 'Lorem ipsum dolor sit amet',
        pointSuccessMessage: 'Lorem ipsum dolor sit amet',
      },
    }, {
      collectionName: 'teams',
      query: { _id: ObjectId('400000000000000000000003') },
      document: {
        _id: ObjectId('400000000000000000000003'),
        eventId: ObjectId('300000000000000000000002'),
        teamName: 'Team 3',
        teamColor: '#7308A5',
        collectedPoints: [],
      },
    }, {
      collectionName: 'teams',
      query: { _id: ObjectId('400000000000000000000002') },
      document: {
        _id: ObjectId('400000000000000000000002'),
        eventId: ObjectId('300000000000000000000001'),
        teamName: 'Team 2',
        teamColor: '#777777',
        collectedPoints: [ObjectId('600000000000000000000004')],
      },
    }],
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/300000000000000000000002/points/collect', {
    description: 'Shouldn\'t collect point if user have no permissions to event',
    method: 'POST',
    expectedStatus: 401,
    signIn: {
      email: 'user1@harcmap.pl',
      password: 'Password1',
    },
    body: {
      send: {
        pointKey: 'Poi8',
      },
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
    expectInDb: [{
      collectionName: 'points',
      query: { _id: ObjectId('600000000000000000000008') },
      document: {
        _id: ObjectId('600000000000000000000008'),
        eventId: ObjectId('300000000000000000000002'),
        pointCategoryId: ObjectId('700000000000000000000004'),
        pointCollectedDate: null,
        pointKey: expect.any(String),
        pointDuration: {
          endDate: null,
          startDate: null,
        },
        pointName: null,
        pointPosition: {
          latitude: 54.46,
          longitude: 18.54,
        },
        pointType: 'permanent',
        pointDescription: 'Lorem ipsum dolor sit amet',
        pointSuccessMessage: 'Lorem ipsum dolor sit amet',
      },
    }, {
      collectionName: 'teams',
      query: { _id: ObjectId('400000000000000000000003') },
      document: {
        _id: ObjectId('400000000000000000000003'),
        eventId: ObjectId('300000000000000000000002'),
        teamName: 'Team 3',
        teamColor: '#7308A5',
        collectedPoints: [],
      },
    }, {
      collectionName: 'teams',
      query: { _id: ObjectId('400000000000000000000002') },
      document: {
        _id: ObjectId('400000000000000000000002'),
        eventId: ObjectId('300000000000000000000001'),
        teamName: 'Team 2',
        teamColor: '#777777',
        collectedPoints: [ObjectId('600000000000000000000004')],
      },
    }],
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/300000000000000000000001/points/collect', {
    description: 'Return error for incorrect input data',
    method: 'POST',
    signIn: {
      email: 'user7@harcmap.pl',
      password: 'Password1',
    },
    expectedStatus: 400,
    body: {
      send: {
        pointKey: 'ab1w2',
      },
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: ['"pointKey" with value "ab1w2" fails to match the required pattern: /^[ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789]{4}$/'],
      },
    },
  });

  testEndpoint('/api/v1/events/300000000000000000000003/points/collect', {
    description: 'Cannot collect already collected point',
    method: 'POST',
    signIn: {
      email: 'user8@harcmap.pl',
      password: 'Password1',
    },
    expectedStatus: 400,
    body: {
      send: {
        pointKey: 'Po2i',
      },
      expect: {
        error: 1301,
        message: 'point already collected',
      },
    },
    expectInDb: [{
      collectionName: 'points',
      query: { _id: ObjectId('600000000000000000000011') },
      document: {
        _id: ObjectId('600000000000000000000011'),
        eventId: ObjectId('300000000000000000000003'),
        pointCategoryId: ObjectId('700000000000000000000007'),
        pointCollectedDate: 1637841854000,
        pointKey: 'Po2i',
        pointDuration: {
          endDate: null,
          startDate: null,
        },
        pointName: null,
        pointPosition: {
          latitude: 54.479,
          longitude: 18.549,
        },
        pointType: 'permanent',
        pointDescription: null,
        pointSuccessMessage: 'Lorem ipsum dolor sit amet',
      },
    }, {
      collectionName: 'teams',
      query: { _id: ObjectId('400000000000000000000004') },
      document: {
        _id: ObjectId('400000000000000000000004'),
        eventId: ObjectId('300000000000000000000003'),
        teamName: 'Team 4',
        teamColor: '#007700',
        collectedPoints: [ObjectId('600000000000000000000011')],
      },
    }],
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/events/300000000000000000000003/points/collect', {
    description: 'Should return 500 status for others http methods',
    method: ['GET', 'PUT', 'DELETE', 'PATCH'],
    expectedStatus: 500,
    body: {
      expect: {
        error: 1000,
        message: 'no schema',
      },
    },
  });
});
