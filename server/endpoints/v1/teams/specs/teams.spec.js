const testEndpoint = require('../../../../tests/utils/test-endpoint');

describe('/api/v1/events/:eventId/teams', () => {
  testEndpoint('/api/v1/events/605920002c60e426288b8971/teams', {
    description: 'Return teams list for event id: 605920002c60e426288b8971',
    signIn: {
      password: 'Password1',
      email: 'admin@harcmap.com',
    },
    method: 'GET',
    body: {
      expect: [{
        teamId: '60e6b02e0b6c6887accf6c03',
        teamName: 'team2',
        teamColor: '#2d8d9d',
        collectedPoints: [],
        teamMembers: [{
          email: 'example@domain.com',
          role: 'teamLeader',
          userId: '507f1f77bcf86cd799439011',
        }, {
          email: 'admin@harcmap.com',
          role: 'admin',
          userId: '6074ab220b6c6887ac32adbb',
        }],
        inviteKeys: [{
          keyId: '60758ddf32eed00e1a283990',
          role: 'teamMember',
          key: 'ggy5',
        }],
      }, {
        teamId: '60e6b02e0b6c6887accf6c05',
        teamName: 'team3',
        teamColor: '#922eb4',
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
      }],
    },
  });

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/teams', {
    description: 'Dont return teams list if user is not logged',
    method: 'GET',
    expectedStatus: 401,
    body: {
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
  });

  testEndpoint('/api/v1/events/605920002c60e426288b8971/teams', {
    description: 'Dont return teams list if user have no right permissions',
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

  testEndpoint('/api/v1/events/60e6cc2eaa95cc33d7c46701/teams', {
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
