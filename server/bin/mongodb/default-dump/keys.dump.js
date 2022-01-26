const { ObjectId } = require('mongodb');

// Wydarzenie 1
const key1 = {
  _id: ObjectId('500000000000000000000001'),
  eventId: ObjectId('300000000000000000000001'),
  teamId: null,
  key: 'K3y1',
  role: 'admin',
};

// Wydarzenie 1
const key2 = {
  _id: ObjectId('500000000000000000000002'),
  eventId: ObjectId('300000000000000000000001'),
  teamId: null,
  key: 'K3y2',
  role: 'observer',
};

// Wydarzenie 1
// Team 1
const key3 = {
  _id: ObjectId('500000000000000000000003'),
  eventId: ObjectId('300000000000000000000001'),
  teamId: null,
  key: 'K3y3',
  role: 'teamLeader',
};

// Wydarzenie 1
// Team 1
const key4 = {
  _id: ObjectId('500000000000000000000004'),
  eventId: ObjectId('300000000000000000000001'),
  teamId: ObjectId('400000000000000000000001'),
  key: 'K3y4',
  role: 'teamMember',
};

// Wydarzenie 1
// Team 2
const key5 = {
  _id: ObjectId('500000000000000000000005'),
  eventId: ObjectId('300000000000000000000001'),
  teamId: ObjectId('400000000000000000000002'),
  key: 'K3y5',
  role: 'teamMember',
};

// Wydarzenie 2
const key6 = {
  _id: ObjectId('500000000000000000000006'),
  eventId: ObjectId('300000000000000000000002'),
  teamId: null,
  key: 'K3y6',
  role: 'admin',
};

// Wydarzenie 2
const key7 = {
  _id: ObjectId('500000000000000000000007'),
  eventId: ObjectId('300000000000000000000002'),
  teamId: null,
  key: 'K3y7',
  role: 'observer',
};

// Wydarzenie 2
const key8 = {
  _id: ObjectId('500000000000000000000008'),
  eventId: ObjectId('300000000000000000000002'),
  teamId: null,
  key: 'K3y8',
  role: 'teamLeader',
};

// Wydarzenie 2
// Team 3
const key9 = {
  _id: ObjectId('500000000000000000000009'),
  eventId: ObjectId('300000000000000000000002'),
  teamId: ObjectId('400000000000000000000003'),
  key: 'K3y9',
  role: 'teamMember',
};

// Wydarzenie 3
const key10 = {
  _id: ObjectId('500000000000000000000010'),
  eventId: ObjectId('300000000000000000000003'),
  teamId: null,
  key: 'K31e',
  role: 'admin',
};

// Wydarzenie 3
const key11 = {
  _id: ObjectId('500000000000000000000011'),
  eventId: ObjectId('300000000000000000000003'),
  teamId: null,
  key: 'K32e',
  role: 'observer',
};

// Wydarzenie 3
const key12 = {
  _id: ObjectId('500000000000000000000012'),
  eventId: ObjectId('300000000000000000000003'),
  teamId: null,
  key: 'K33e',
  role: 'teamLeader',
};

// Wydarzenie 3
// Team 4
const key13 = {
  _id: ObjectId('500000000000000000000013'),
  eventId: ObjectId('300000000000000000000003'),
  teamId: ObjectId('400000000000000000000004'),
  key: 'K34e',
  role: 'teamMember',
};

module.exports = [
  key1,
  key2,
  key3,
  key4,
  key5,
  key6,
  key7,
  key8,
  key9,
  key10,
  key11,
  key12,
  key13,
];
