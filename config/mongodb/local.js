// Select database
db = db.getSiblingDB('harcmap');

/**
 * This are example data for tests
 */
// Create event in "events" collection
db.events.insert({
  'eventId': 'ab12',
  'eventName': 'HarcEvent',
  'mapZoom': NumberInt(11),
  'mapLongitude': 18.4735,
  'mapLatitude': 54.4787,
});

db.point_categories.insertMany([{
  'categoryId': NumberInt(1),
  'pointValue': NumberInt(1),
  'pointShape': NumberInt(1),
}, {
  'categoryId': NumberInt(2),
  'pointValue': NumberInt(2),
  'pointShape': NumberInt(2),
}, {
  'categoryId': NumberInt(3),
  'pointValue': NumberInt(3),
  'pointShape': NumberInt(3),
}]);

db.event_ab12.insertMany([{
  'pointLatitude': 54.5309,
  'pointLongitude': 18.4889,
  'pointCategory': NumberInt(1),
  'pointId': '4lwg',
  'pointType': 'permanent',
  'pointName': 'Some point',
  'pointExpirationTime': null,
  'pointCollectionTime': null,
}, {
  'pointLatitude': 54.51857,
  'pointLongitude': 18.55864,
  'pointCategory': NumberInt(1),
  'pointId': 'QFpj',
  'pointType': 'permanent',
  'pointName': 'Some point',
  'pointExpirationTime': null,
  'pointCollectionTime': null,
}, {
  'pointLatitude': 54.4839,
  'pointLongitude': 18.555,
  'pointCategory': NumberInt(2),
  'pointId': 'WpTo',
  'pointType': 'permanent',
  'pointName': 'Some point',
  'pointExpirationTime': null,
  'pointCollectionTime': null,
}, {
  'pointLatitude': 54.4671,
  'pointLongitude': 18.5581,
  'pointCategory': NumberInt(3),
  'pointId': '3gvy',
  'pointType': 'permanent',
  'pointName': 'Some point',
  'pointExpirationTime': null,
  'pointCollectionTime': null,
}]);

// Create example user in "users" collection
db.users.insert({
  'user': 'zhp@harcmap.henouser.pl',
  'userTeam': 'FonzieBoys',
  // Password: HarcMap1
  'password': 'f363cc9abf38511a7efd11554c346d6106bea3156e24f0322cb4659d3871baf1584a348916c43eaeca94e6fa0048d1a35905fa3dfd752c427a1b9993ab120bb9',
  'userEvents': [
    'ab12',
  ],
  'accountType': 'common',
  'accountIsActive': true,
  'activationKey': null,
  'forgotKey': null,
  'forgotTimestamp': null,
  'accountCreated': Date.now(),
  'collectedPointsIds': [],
});

// Create example user in "users" collection
db.users.insert({
  'user': 'dominik.betka@gmail.com',
  'userTeam': 'Dominik Betka',
  // Password: HarcMap1
  'password': 'f363cc9abf38511a7efd11554c346d6106bea3156e24f0322cb4659d3871baf1584a348916c43eaeca94e6fa0048d1a35905fa3dfd752c427a1b9993ab120bb9',
  'userEvents': [
    'ab12',
  ],
  'accountType': 'common',
  'accountIsActive': true,
  'activationKey': null,
  'forgotKey': null,
  'forgotTimestamp': null,
  'accountCreated': Date.now(),
  'collectedPointsIds': [],
});

db.createUser({
  user: 'harc',
  pwd: 'map',
  roles: [{
    role: 'readWrite',
    db: 'harcmap',
  }],
});
