const testEndpoint = require('../../../../tests/utils/test-endpoint');

describe('/api/v1/events/:eventId/teams/:teamId', () => {
  testEndpoint('/api/v1/events/605920002c60e426288b8971/teams/60e6b02e0b6c6887accf6c05', {
    description: 'Return teams list for event id: 605920002c60e426288b8971 and team 60e6b02e0b6c6887accf6c05',
    signIn: {
      password: 'Password1',
      email: 'admin@harcmap.com',
    },
    method: 'GET',
    body: {
      expect: {
        teamName: 'team3',
        collectedPoints: ['60e6d13faa95cc33d7c467aa'],
        teamMembers: [{
          email: 'member@harcmap.com',
          role: 'teamMember',
          userId: '6074ab220b6c6887ac32adaa',
        }, {
          email: 'creator@harcmap.com',
          role: 'creator',
          userId: '6074ab220b6c6887ac32ddff',
        }],
        inviteKeys: [{
          keyId: '60758ddf32eed00e1a283911',
          role: 'teamMember',
          key: 'hd5b',
        }],
      },
    },
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/teams/60e6b02e0b6c6887accf6c05', {
    description: 'Dont return team if user is not logged',
    method: 'GET',
    expectedStatus: 401,
    body: {
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
  });

  testEndpoint('/api/v1/events/605920002c60e426288b8971/teams/60e6b02e0b6c6887accf6c05', {
    description: 'Dont return team list if user have no right permissions',
    signIn: {
      password: 'Password1',
      email: 'example@domain.com',
    },
    method: 'GET',
    expectedStatus: 401,
    body: {
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/teams/60e6b02e0b6c6887accf6c05', {
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
