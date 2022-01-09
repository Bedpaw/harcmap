/**
 * THIS DATA ARE COPY OF DEFAULT.DUMP.JS FROM MONGODB/INIT CATALOG
 *
 * FOR NOW WE MUST SUPPORT BOTH FILES
 * TODO MERGE THIS TWO FILES
 */
const { ObjectId } = require('mongodb');

const data = {
  users: [{
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
  }, {
    '_id': ObjectId('6074ab410b6c6887ac32adbb'),
    'email': 'quest@google.com',
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
    'userEvents': [ObjectId('605720002c60e426288b896f')],
  }, {
    '_id': ObjectId('6074ab220b6c6887ac32adbb'),
    'email': 'admin@harcmap.com',
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
    'userEvents': [ObjectId('607f191e810c197222e860ea')],
  }, {
    '_id': ObjectId('6074ab220b6c6887ac32adaa'),
    'email': 'member@harcmap.com',
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
    'userEvents': [ObjectId('607f191e810c197222e860aa')],
  }, {
    '_id': ObjectId('6074ab220b6c6887ac32ddff'),
    'email': 'creator@harcmap.com',
    // password: Password1
    'password': '61a73c554fd0a2024eb3bffb06a597ef5605920002c60e426288b8971095764ab049d8440c683f0ccd4e77d5a737fa90358664006cfa13c3b839028e63fc82f77e652730524c111efac95073',
    'accountActivation': {
      'isActive': true,
      'key': null,
    },
    'passwordReset': {
      'key': null,
      'date': null,
    },
    'accountCreated': 0,
    'userEvents': [ObjectId('607f191e810c197222e86022')],
  }],
  // TODO accountBaned - in event (admin ban, multi device login)
  usersEvents: [{
    '_id': ObjectId('507f191e810c19729de860ea'),
    'eventId': ObjectId('60e6cc2eaa95cc33d7c46701'),
    'teamId': ObjectId('60e6ca2aaa95cc33d7c466f8'),
    'role': 'creator',
    'isBanned': false,
  }, {
    '_id': ObjectId('605920002c60e426288b896f'),
    'eventId': ObjectId('605920002c60e426288b8971'),
    'teamId': ObjectId('60e6b02e0b6c6887accf6c03'),
    'role': 'teamLeader',
    'isBanned': false,
  }, {
    '_id': ObjectId('605720002c60e426288b896f'),
    'eventId': ObjectId('60e6cc2eaa95cc33d7c46701'),
    'teamId': ObjectId('60e6ca2aaa95cc33d7c466f8'),
    'role': 'teamMember',
    'isBanned': false,
  }, {
    '_id': ObjectId('607f191e810c197222e860ea'),
    'eventId': ObjectId('605920002c60e426288b8971'),
    'teamId': ObjectId('60e6b02e0b6c6887accf6c03'),
    'role': 'admin',
    'isBanned': false,
  }, {
    '_id': ObjectId('607f191e810c197222e860aa'),
    'eventId': ObjectId('605920002c60e426288b8971'),
    'teamId': ObjectId('60e6b02e0b6c6887accf6c05'),
    'role': 'teamMember',
    'isBanned': false,
  }, {
    '_id': ObjectId('607f191e810c197222e86022'),
    'eventId': ObjectId('605920002c60e426288b8971'),
    'teamId': ObjectId('60e6b02e0b6c6887accf6c05'),
    'role': 'creator',
    'isBanned': false,
  }],
  teams: [{
    '_id': ObjectId('60e6ca2aaa95cc33d7c466f8'),
    'eventId': ObjectId('60e6cc2eaa95cc33d7c46701'),
    'teamName': 'team1',
    'teamColor': '#6ea13a',
    'collectedPoints': [],
  }, {
    '_id': ObjectId('60e6b02e0b6c6887accf6c03'),
    'eventId': ObjectId('605920002c60e426288b8971'),
    'teamName': 'team2',
    'teamColor': '#2d8d9d',
    'collectedPoints': [],
  }, {
    '_id': ObjectId('60e6b02e0b6c6887accf6c05'),
    'eventId': ObjectId('605920002c60e426288b8971'),
    'teamName': 'team3',
    'teamColor': '#922eb4',
    'collectedPoints': [ObjectId('60e6d13faa95cc33d7c467aa')],
  }],
  events: [{
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
  }, {
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
  }],
  keys: [{
    '_id': ObjectId('60758ddf32eed00e1a283965'),
    'key': 'te12',
    'role': 'teamMember',
    'eventId': ObjectId('60e6cc2eaa95cc33d7c46701'),
    'teamId': ObjectId('60e6ca2aaa95cc33d7c466f8'),
  }, {
    '_id': ObjectId('60758d2432eed00e1a283961'),
    'key': 'ev12',
    'role': 'teamLeader',
    'eventId': ObjectId('60e6cc2eaa95cc33d7c46701'),
    'teamId': null,
  }, {
    '_id': ObjectId('60758c9432eed00e1a28395a'),
    'key': 'ev23',
    'role': 'observer',
    'eventId': ObjectId('60e6cc2eaa95cc33d7c46701'),
    'teamId': null,
  }, {
    '_id': ObjectId('60758c6132eed00e1a283958'),
    'key': 'ev23',
    'role': 'admin',
    'eventId': ObjectId('60e6cc2eaa95cc33d7c46701'),
    'teamId': null,
  }, {
    '_id': ObjectId('60758ddf32eed00e1a283911'),
    'key': 'hd5b',
    'role': 'teamMember',
    'eventId': ObjectId('605920002c60e426288b8971'),
    'teamId': ObjectId('60e6b02e0b6c6887accf6c05'),
  }, {
    '_id': ObjectId('60758ddf32eed00e1a283990'),
    'key': 'ggy5',
    'role': 'teamMember',
    'eventId': ObjectId('605920002c60e426288b8971'),
    'teamId': ObjectId('60e6b02e0b6c6887accf6c03'),
  }],
  points: [{
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
  }, {
    '_id': ObjectId('60e6d13faa95cc33d7c467aa'),
    'eventId': ObjectId('60e6cc2eaa95cc33d7c46701'),
    'pointKey': 'wg53',
    'pointName': 'Point second',
    'pointType': 'permanent',
    'pointCollectedDate': 34523416,
    'pointCategoryId': ObjectId('60e7046eaa95cc33d7c4672b'),
    'pointDuration': {
      'startDate': null,
      'endDate': null,
    },
    'pointPosition': {
      'longitude': 1,
      'latitude': 1,
    },
  }],
  categories: [{
    '_id': ObjectId('60e7046eaa95cc33d7c4672b'),
    'eventId': ObjectId('60e6cc2eaa95cc33d7c46701'),
    'categoryName': 'red',
    'pointValue': 2,
    'pointShape': 'dot',
  }, {
    '_id': ObjectId('60e7046eaa15cc33d7c4672b'),
    'eventId': ObjectId('60e6cc2eaa95cc33d7c46701'),
    'categoryName': 'green',
    'pointValue': 1,
    'pointShape': 'dot',
  }],
};

async function insertDefaultData (db) {
  const collectionsList = Object.keys(data);
  const collectionsListLength = collectionsList.length;

  for (let i = 0; i < collectionsListLength; i += 1) {
    const collectionName = collectionsList[i];
    const collectionDataArray = data[collectionName];

    await db.collection(collectionName).insertMany(collectionDataArray);
  }
}

module.exports = insertDefaultData;
