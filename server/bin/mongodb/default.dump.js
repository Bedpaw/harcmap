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
  'userEvents': [ObjectId('507f191e810c19729de860ea')],
});

// TODO accountBaned - in event (admin ban, multi device login)
db.usersEvents.insert({
  '_id': ObjectId('507f191e810c19729de860ea'),
  'eventId': ObjectId('60e6cc2eaa95cc33d7c46701'),
  'teamId': ObjectId('60e6ca2aaa95cc33d7c466f8'),
  'role': 'creator',
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
  'teamsCollectionName': 'teams_60e6cc2eaa95cc33d7c46701',
  'pointsCollectionName': 'points_60e6cc2eaa95cc33d7c46701',
  'categoriesCollectionName': 'categories_60e6cc2eaa95cc33d7c46701',
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

db.teams_60e6cc2eaa95cc33d7c46701.insert({
  '_id': ObjectId('60e6ca2aaa95cc33d7c466f8'),
  'teamName': 'team1',
  'collectedPoints': [],
});

db.points_60e6cc2eaa95cc33d7c46701.insert({
  '_id': ObjectId('60e6d13faa95cc33d7c4671b'),
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

db.categories_60e6cc2eaa95cc33d7c46701.insert({
  '_id': ObjectId('60e7046eaa95cc33d7c4672b'),
  'categoryName': 'red',
  'pointValue': 2,
  'pointShape': 'dot',
});
