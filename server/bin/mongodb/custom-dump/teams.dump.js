const { ObjectId } = require('mongodb');

const team1 = {
  _id: ObjectId('400000000000000000000001'),
  eventId: ObjectId('300000000000000000000001'),
  teamName: 'Team 1',
  collectedPoints: [ObjectId('600000000000000000000001'), ObjectId('600000000000000000000002'), ObjectId('600000000000000000000003')],
};

const team2 = {
  _id: ObjectId('400000000000000000000002'),
  eventId: ObjectId('300000000000000000000001'),
  teamName: 'Team 2',
  collectedPoints: [ObjectId('600000000000000000000004')],
};

const team3 = {
  _id: ObjectId('400000000000000000000003'),
  eventId: ObjectId('300000000000000000000002'),
  teamName: 'Team 3',
  collectedPoints: [],
};

const team4 = {
  _id: ObjectId('400000000000000000000004'),
  eventId: ObjectId('300000000000000000000003'),
  teamName: 'Team 4',
  collectedPoints: [ObjectId('600000000000000000000010'), ObjectId('600000000000000000000011')],
};

module.exports = [
  team1,
  team2,
  team3,
  team4,
];
