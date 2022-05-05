const { ObjectId } = require('mongodb');

const team1 = {
  _id: ObjectId('400000000000000000000001'),
  eventId: ObjectId('300000000000000000000001'),
  teamName: 'Team 1',
  teamColor: '#C863DE',
  collectedPoints: [ObjectId('600000000000000000000001'), ObjectId('600000000000000000000002'), ObjectId('600000000000000000000003')],
};

const team2 = {
  _id: ObjectId('400000000000000000000002'),
  eventId: ObjectId('300000000000000000000001'),
  teamName: 'Team 2',
  teamColor: '#777777',
  collectedPoints: [ObjectId('600000000000000000000004')],
};

const team3 = {
  _id: ObjectId('400000000000000000000003'),
  eventId: ObjectId('300000000000000000000002'),
  teamName: 'Team 3',
  teamColor: '#7308A5',
  collectedPoints: [],
};

const team4 = {
  _id: ObjectId('400000000000000000000004'),
  eventId: ObjectId('300000000000000000000003'),
  teamName: 'Team 4',
  teamColor: '#007700',
  collectedPoints: [ObjectId('600000000000000000000010'), ObjectId('600000000000000000000011')],
};

module.exports = [
  team1,
  team2,
  team3,
  team4,
];
