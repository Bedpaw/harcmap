// Select database
db = db.getSiblingDB('harcmap');

/**
 * This are example data for local development
 */
// Create user in "users" collection
db.users.insert({
  '_id': ObjectId('507f1f77bcf86cd799439011'),
  'email': 'example@domain.com',
  // password: Password1
  'password': '61a73c554fd0a2024eb3bffb06a597ef5095764ab049d8440c683f0ccd4e77d5a737fa90358664006cfa13c3b839028e63fc82f77e652730524c111efac95073',
  'accountActivation': {
    'isActive': true,
    'key': null,
  },
  'passwordReset': {
    'key': null,
    'date': null,
  },
  'accountCreated': 0,
  'userEvents': [ObjectId('507f191e810c19729de860ea'), ObjectId('605920002c60e426288b896f')],
});

db.users.insert({
  '_id': ObjectId('6074ab410b6c6887ac32adbb'),
  'email': 'quest@google.com',
  // password: Password1
  'password': '61a73c554fd0a2024eb3bffb06a597ef5095764ab049d8440c683f0ccd4e77d5a737fa90358664006cfa13c3b839028e63fc82f77e652730524c111efac95073',
  'accountActivation': {
    'isActive': false,
    'key': 'sfawefwfwff322r1rcr1c3rx23c4',
  },
  'passwordReset': {
    'key': null,
    'date': null,
  },
  'accountCreated': 0,
  'userEvents': [ObjectId('605920002c60e426288b896f')],
});

// TODO accountBaned - in event (admin ban, multi device login)
db.usersEvents.insert({
  '_id': ObjectId('507f191e810c19729de860ea'),
  'eventId': ObjectId('60e6cc2eaa95cc33d7c46701'),
  'teamId': ObjectId('60e6ca2aaa95cc33d7c466f8'),
  'role': 'creator',
  'isBanned': false,
});

db.usersEvents.insert({
  '_id': ObjectId('605920002c60e426288b896f'),
  'eventId': ObjectId('605920002c60e426288b8971'),
  'teamId': ObjectId('60e6b02e0b6c6887accf6c03'),
  'role': 'teamLeader',
  'isBanned': false,
});

// duplicate
db.usersEvents.insert({
  '_id': ObjectId('605920002c60e426288b896f'),
  'eventId': ObjectId('605920002c60e426288b8971'),
  'teamId': ObjectId('60e6b02e0b6c6887accf6c03'),
  'role': 'teamMember',
  'isBanned': false,
});

db.keys.insert({
  '_id': ObjectId('60758ddf32eed00e1a283965'),
  'key': 'te12',
  'role': 'teamMember',
  'eventId': ObjectId('60e6cc2eaa95cc33d7c46701'),
  'teamId': ObjectId('60e6ca2aaa95cc33d7c466f8'),
});

db.keys.insert({
  '_id': ObjectId('60758d2432eed00e1a283961'),
  'key': 'ev12',
  'role': 'teamLeader',
  'eventId': ObjectId('60e6cc2eaa95cc33d7c46701'),
  'teamId': null,
});

db.keys.insert({
  '_id': ObjectId('60758c9432eed00e1a28395a'),
  'key': 'ev23',
  'role': 'observer',
  'eventId': ObjectId('60e6cc2eaa95cc33d7c46701'),
  'teamId': null,
});

db.keys.insert({
  '_id': ObjectId('60758c6132eed00e1a283958'),
  'key': 'ev23',
  'role': 'admin',
  'eventId': ObjectId('60e6cc2eaa95cc33d7c46701'),
  'teamId': null,
});

db.events.insert({
  '_id': ObjectId('60e6cc2eaa95cc33d7c46701'),
  'eventName': 'event1',
  'eventDuration': {
    'startDate': 1,
    'endDate': 1,
  },
  'mapProperties': {
    'zoom': 10,
    'longitude': 1,
    'latitude': 1,
  },
  'eventRefreshTime': 1,
});

db.events.insert({
  '_id': ObjectId('605920002c60e426288b8971'),
  'eventName': 'event2',
  'eventDuration': {
    'startDate': 1,
    'endDate': 1,
  },
  'mapProperties': {
    'zoom': 10,
    'longitude': 1,
    'latitude': 1,
  },
  'eventRefreshTime': 1,
});

db.teams.insert({
  '_id': ObjectId('60e6ca2aaa95cc33d7c466f8'),
  'eventId': ObjectId('60e6cc2eaa95cc33d7c46701'),
  'teamName': 'team1',
  'collectedPoints': [],
});

db.teams.insert({
  '_id': ObjectId('60e6b02e0b6c6887accf6c03'),
  'eventId': ObjectId('605920002c60e426288b8971'),
  'teamName': 'team2',
  'collectedPoints': [],
});

db.points.insert({
  '_id': ObjectId('60e6d13faa95cc33d7c4671b'),
  'eventId': ObjectId('60e6cc2eaa95cc33d7c46701'),
  'pointKey': 'ab12',
  'pointName': 'Point name',
  'pointType': 'permanent',
  'pointCollectedDate': null,
  'pointCategoryId': ObjectId('60e7046eaa95cc33d7c4672b'),
  'pointDuration': {
    'startDate': null,
    'endDate': null,
  },
  'pointPosition': {
    'longitude': 1,
    'latitude': 1,
  },
});

db.categories_.insert({
  '_id': ObjectId('60e7046eaa95cc33d7c4672b'),
  'eventId': ObjectId('60e6cc2eaa95cc33d7c46701'),
  'categoryName': 'red',
  'pointValue': 2,
  'pointShape': 'dot',
});
