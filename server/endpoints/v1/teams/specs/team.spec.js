const testEndpoint = require('../../../../tests/utils/test-endpoint');

describe('/api/v1/events/:eventId/teams/:teamId', () => {
  testEndpoint('/api/v1/events/300000000000000000000001/teams/400000000000000000000001', {
    description: 'Return team object 400000000000000000000001',
    signIn: {
      email: 'user6@harcmap.pl',
      password: 'Password1',
    },
    method: 'GET',
    body: {
      expect: {
        'teamName': 'Team 1',
        'teamColor': '#C863DE',
        'teamMembers': [
          {
            'userId': '100000000000000000000003',
            'email': 'user3@harcmap.pl',
            'nickname': 'Nick 2',
            'role': 'teamLeader',
          },
          {
            'userId': '100000000000000000000004',
            'email': 'user4@harcmap.pl',
            'nickname': 'Nick 3',
            'role': 'teamMember',
          },
          {
            'userId': '100000000000000000000007',
            'email': 'user7@harcmap.pl',
            'nickname': 'Nick 8',
            'role': 'teamMember',
          },
        ],
        'inviteKeys': [
          {
            'keyId': '500000000000000000000004',
            'role': 'teamMember',
            'key': 'K3y4',
          },
        ],
        'collectedPoints': [
          '600000000000000000000001',
          '600000000000000000000003',
        ],
      },
    },
  });

  testEndpoint('/api/v1/events/300000000000000000000001/teams/400000000000000000000001', {
    description: 'Return team object 400000000000000000000001 for teamLeader',
    signIn: {
      password: 'Password1',
      email: 'user3@harcmap.pl',
    },
    method: 'GET',
    body: {
      expect: {
        'teamName': 'Team 1',
        'teamColor': '#C863DE',
        'teamMembers': [
          {
            'userId': '100000000000000000000003',
            'email': 'user3@harcmap.pl',
            'nickname': 'Nick 2',
            'role': 'teamLeader',
          },
          {
            'userId': '100000000000000000000004',
            'email': 'user4@harcmap.pl',
            'nickname': 'Nick 3',
            'role': 'teamMember',
          },
          {
            'userId': '100000000000000000000007',
            'email': 'user7@harcmap.pl',
            'nickname': 'Nick 8',
            'role': 'teamMember',
          },
        ],
        'inviteKeys': [
          {
            'keyId': '500000000000000000000004',
            'role': 'teamMember',
            'key': 'K3y4',
          },
        ],
        'collectedPoints': [
          '600000000000000000000001',
          '600000000000000000000003',
        ],
      },
    },
  });

  testEndpoint('/api/v1/events/300000000000000000000001/teams/400000000000000000000001', {
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

  testEndpoint('/api/v1/events/300000000000000000000001/teams/400000000000000000000001', {
    description: 'Should return 500 status for others http methods',
    method: ['POST', 'PUT', 'DELETE', 'PATCH'],
    expectedStatus: 500,
    body: {
      expect: {
        error: 1000,
        message: 'no schema',
      },
    },
  });
});
