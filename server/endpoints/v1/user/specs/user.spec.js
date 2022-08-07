const testEndpoint = require('../../../../tests/utils/test-endpoint');
const { ObjectId } = require('mongodb');
const { getSHA } = require('../../../../libs/utils');

describe('/api/v1/user', () => {
  testEndpoint('/api/v1/user', {
    description: 'Update password for user 100000000000000000000001',
    method: 'PUT',
    signIn: {
      email: 'user1@harcmap.pl',
      password: 'Password1',
    },
    body: {
      send: {
        userId: '100000000000000000000001',
        oldPassword: 'Password1',
        newPassword: 'newPassword2',
      },
      expect: {
        success: true,
      },
    },
    expectInDb: {
      collectionName: 'users',
      query: { _id: ObjectId('100000000000000000000001') },
      document: {
        _id: ObjectId('100000000000000000000001'),
        email: 'user1@harcmap.pl',
        password: getSHA('newPassword2'),
        accountActivation: {
          isActive: true,
          key: null,
        },
        passwordReset: {
          key: null,
          date: null,
        },
        accountCreated: 1609503763000,
        userEvents: [
          ObjectId('200000000000000000000001'),
        ],
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/user', {
    description: 'Shouldn\'t update user password if given oldPassword doesn\'t match those in database',
    method: 'PUT',
    signIn: {
      email: 'user1@harcmap.pl',
      password: 'Password1',
    },
    expectedStatus: 400,
    body: {
      send: {
        userId: '100000000000000000000001',
        oldPassword: 'Password2',
        newPassword: 'newPassword2',
      },
      expect: {
        error: 1606,
        message: 'passwords do not match',
      },
    },
    expectInDb: {
      collectionName: 'users',
      query: { _id: ObjectId('100000000000000000000001') },
      document: {
        _id: ObjectId('100000000000000000000001'),
        email: 'user1@harcmap.pl',
        password: getSHA('Password1'),
        accountActivation: {
          isActive: true,
          key: null,
        },
        passwordReset: {
          key: null,
          date: null,
        },
        accountCreated: 1609503763000,
        userEvents: [
          ObjectId('200000000000000000000001'),
        ],
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/user', {
    description: 'Shouldn\'t update user data for unauthorized user',
    method: 'PUT',
    expectedStatus: 401,
    body: {
      send: {
        userId: '100000000000000000000001',
      },
      expect: {
        error: 1104,
        message: 'no permission to resource',
      },
    },
  });

  testEndpoint('/api/v1/user', {
    description: 'Shouldn\'t update userEvent nickname in which user is not participating',
    method: 'PUT',
    signIn: {
      email: 'user3@harcmap.pl',
      password: 'Password1',
    },
    expectedStatus: 400,
    body: {
      send: {
        userId: '100000000000000000000003',
        userEvents: [
          {
            eventId: '300000000000000000000001',
            nickname: 'User33',
          },
          {
            eventId: '300000000000000000000002',
            nickname: 'User31',
          },
        ],
      },
      expect: {
        error: 1218,
        message: 'user does not belong to selected event',
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/user', {
    description: 'Should change user nickname in given userEvents',
    method: 'PUT',
    signIn: {
      email: 'user3@harcmap.pl',
      password: 'Password1',
    },
    body: {
      send: {
        userId: '100000000000000000000003',
        userEvents: [
          {
            eventId: '300000000000000000000001',
            nickname: 'User33',
          },
        ],
      },
      expect: {
        success: true,
      },
    },
    expectInDb: {
      collectionName: 'usersEvents',
      query: { _id: ObjectId('200000000000000000000002') },
      document: {
        _id: ObjectId('200000000000000000000002'),
        eventId: ObjectId('300000000000000000000001'),
        teamId: ObjectId('400000000000000000000001'),
        role: 'teamLeader',
        nickname: 'User33',
        isBanned: false,
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/user', {
    description: 'Shouldn\'t update user email if given password doesn\'t match those in database',
    method: 'PUT',
    signIn: {
      email: 'user4@harcmap.pl',
      password: 'Password1',
    },
    expectedStatus: 400,
    body: {
      send: {
        userId: '100000000000000000000004',
        email: 'test4@harcmap.pl',
        oldPassword: 'Password2',
      },
      expect: {
        error: 1606,
        message: 'passwords do not match',
      },
    },
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/user', {
    description: 'Should update user email, password and nickname in given events',
    method: 'PUT',
    signIn: {
      email: 'user4@harcmap.pl',
      password: 'Password1',
    },
    body: {
      send: {
        userId: '100000000000000000000004',
        email: 'test4@harcmap.pl',
        oldPassword: 'Password1',
        newPassword: 'newPassword2',
        userEvents: [
          {
            eventId: '300000000000000000000001',
            nickname: 'Nick 4 test1',
          },
          {
            eventId: '300000000000000000000002',
            nickname: 'Nick 4 test2',
          },
        ],
      },
      expect: {
        success: true,
      },
    },
    expectInDb: [
      {
        collectionName: 'users',
        query: { _id: ObjectId('100000000000000000000004') },
        document: {
          _id: ObjectId('100000000000000000000004'),
          email: 'test4@harcmap.pl',
          password: getSHA('newPassword2'),
          accountActivation: {
            isActive: true,
            key: null,
          },
          passwordReset: {
            key: null,
            date: null,
          },
          accountCreated: 1609503763000,
          userEvents: [
            ObjectId('200000000000000000000003'),
            ObjectId('200000000000000000000004'),
          ],
        },
      },
      {
        collectionName: 'usersEvents',
        query: { _id: ObjectId('200000000000000000000003') },
        document: {
          _id: ObjectId('200000000000000000000003'),
          eventId: ObjectId('300000000000000000000001'),
          teamId: ObjectId('400000000000000000000001'),
          role: 'teamMember',
          nickname: 'Nick 4 test1',
          isBanned: false,
        },
      },
      {
        collectionName: 'usersEvents',
        query: { _id: ObjectId('200000000000000000000004') },
        document: {
          _id: ObjectId('200000000000000000000004'),
          eventId: ObjectId('300000000000000000000002'),
          teamId: null,
          role: 'creator',
          nickname: 'Nick 4 test2',
          isBanned: false,
        },
      },
    ],
    resetDbToDefault: true,
  });

  testEndpoint('/api/v1/user', {
    description: 'Should return 500 status for others http methods',
    method: ['GET', 'POST', 'DELETE', 'PATCH'],
    expectedStatus: 500,
    body: {
      expect: {
        error: 1000,
        message: 'no schema',
      },
    },
  });
});
