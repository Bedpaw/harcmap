const testEndpoint = require('../../../../tests/utils/test-endpoint');

describe('/api/v1/users', () => {
  testEndpoint('/api/v1/users?eventId=60e6cc2eaa95cc33d7c46701', {
    description: 'Return users list for event 60e6cc2eaa95cc33d7c46701',
    signIn: {
      email: 'example@domain.com',
      password: 'Password1',
    },
    method: 'GET',
    body: {
      expect: [{
        email: 'example@domain.com',
        userEvents: [{
          eventId: '60e6cc2eaa95cc33d7c46701',
          eventName: 'event1',
          isBanned: false,
          role: 'creator',
          teamId: '60e6ca2aaa95cc33d7c466f8',
          teamName: 'team1',
        }],
      }, {
        email: 'quest@google.com',
        userEvents: [{
          eventId: '60e6cc2eaa95cc33d7c46701',
          eventName: 'event1',
          isBanned: false,
          role: 'member',
          teamId: '60e6ca2aaa95cc33d7c466f8',
          teamName: 'team1',
        }],
      }],
    },
  });

  testEndpoint('/api/v1/users?eventId=605920002c60e426288b8971', {
    description: 'Return users list for event 605920002c60e426288b8971',
    signIn: {
      email: 'admin@harcmap.com',
      password: 'Password1',
    },
    method: 'GET',
    body: {
      expect: [{
        email: 'example@domain.com',
        userEvents: [{
          eventId: '605920002c60e426288b8971',
          eventName: 'event2',
          isBanned: false,
          role: 'teamLeader',
          teamId: '60e6b02e0b6c6887accf6c03',
          teamName: 'team2',
        }],
      }, {
        email: 'member@harcmap.com',
        userEvents: [{
          eventId: '605920002c60e426288b8971',
          eventName: 'event2',
          isBanned: false,
          role: 'teamMember',
          teamId: '60e6b02e0b6c6887accf6c05',
          teamName: 'team3',
        }],
      }, {
        email: 'admin@harcmap.com',
        userEvents: [{
          eventId: '605920002c60e426288b8971',
          eventName: 'event2',
          isBanned: false,
          role: 'admin',
          teamId: '60e6b02e0b6c6887accf6c03',
          teamName: 'team2',
        }],
      }],
    },
  });

  testEndpoint('/api/v1/users?eventId=60e6cc2e95cc33d7c46701', {
    description: 'Return error for wrong event id',
    method: 'GET',
    signIn: {
      email: 'example@domain.com',
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

  testEndpoint('/api/v1/users?eventId=60e6cc2eaa95cc33d7c46701', {
    description: 'Dont return data for unauthorized user',
    method: 'GET',
    expectedStatus: 401,
    body: {
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
  });

  testEndpoint('/api/v1/users?eventId=60e6cc2eaa95cc33d7c46701', {
    description: 'Dont return data for users with to low permissions',
    method: 'GET',
    signIn: {
      email: 'quest@google.com',
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

  testEndpoint('/api/v1/users?eventId', {
    description: 'Return validation error for wrong eventId format',
    method: 'GET',
    signIn: {
      email: 'example@domain.com',
      password: 'Password1',
    },
    expectedStatus: 400,
    body: {
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: [
          '"eventId" is not allowed to be empty',
        ],
      },
    },
  });

  testEndpoint('/api/v1/users', {
    description: 'Return validation error for no eventId',
    method: 'GET',
    signIn: {
      email: 'example@domain.com',
      password: 'Password1',
    },
    expectedStatus: 400,
    body: {
      expect: {
        error: 1001,
        message: 'request validation error',
        errorDetails: [
          '"eventId" is required',
        ],
      },
    },
  });

  testEndpoint('/api/v1/users', {
    description: 'Should return 500 status for others http methods',
    method: ['PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
    expectedStatus: 500,
    body: {
      expect: {
        error: 1000,
        message: 'no schema',
      },
    },
  });
});
