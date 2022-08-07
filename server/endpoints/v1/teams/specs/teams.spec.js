const testEndpoint = require('../../../../tests/utils/test-endpoint');

describe('/api/v1/events/:eventId/teams', () => {
  testEndpoint('/api/v1/events/300000000000000000000001/teams', {
    description: 'Return teams list for event id: 300000000000000000000001',
    signIn: {
      email: 'user1@harcmap.pl',
      password: 'Password1',
    },
    method: 'GET',
    body: {
      expect: [{
        teamName: 'Team 1',
        teamId: '400000000000000000000001',
        teamColor: '#C863DE',
        teamMembers: [
          {
            userId: '100000000000000000000003',
            email: 'user3@harcmap.pl',
            nickname: 'Nick 2',
            role: 'teamLeader',
          },
          {
            userId: '100000000000000000000004',
            email: 'user4@harcmap.pl',
            nickname: 'Nick 3',
            role: 'teamMember',
          },
          {
            userId: '100000000000000000000007',
            email: 'user7@harcmap.pl',
            nickname: 'Nick 8',
            role: 'teamMember',
          },
        ],
        inviteKeys: [
          {
            keyId: '500000000000000000000004',
            role: 'teamMember',
            key: 'K3y4',
          },
        ],
        collectedPoints: [
          '600000000000000000000001',
          '600000000000000000000003',
        ],
      }, {
        teamName: 'Team 2',
        teamId: '400000000000000000000002',
        teamColor: '#777777',
        teamMembers: [
          {
            userId: '100000000000000000000005',
            email: 'user5@harcmap.pl',
            nickname: 'Nick 5',
            role: 'teamLeader',
          },
          {
            userId: '100000000000000000000008',
            email: 'user8@harcmap.pl',
            nickname: 'Nick 11',
            role: 'teamMember',
          },
        ],
        inviteKeys: [
          {
            keyId: '500000000000000000000005',
            role: 'teamMember',
            key: 'K3y5',
          },
        ],
        collectedPoints: [
          '600000000000000000000004',
        ],
      }],
    },
  });

  testEndpoint('/api/v1/events/300000000000000000000001/teams', {
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

  testEndpoint('/api/v1/events/300000000000000000000001/teams', {
    description: 'Dont return teams list if user have no right permissions',
    signIn: {
      email: 'user3@harcmap.pl',
      password: 'Password1',
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

  testEndpoint('/api/v1/events/300000000000000000000001/teams', {
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
