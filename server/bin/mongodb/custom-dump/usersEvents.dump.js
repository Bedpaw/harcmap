const { ObjectId } = require('mongodb');

// user1
// Wydarzenie 1
const userEvent1 = {
  _id: ObjectId('200000000000000000000001'),
  eventId: ObjectId('300000000000000000000001'),
  teamId: null,
  role: 'creator',
  nickname: 'Nick 1',
  isBanned: false,
};

// user3
// Wydarzenie 1
// Team 1
const userEvent2 = {
  _id: ObjectId('200000000000000000000002'),
  eventId: ObjectId('300000000000000000000001'),
  teamId: ObjectId('400000000000000000000001'),
  role: 'teamLeader',
  nickname: 'Nick 2',
  isBanned: false,
};

// user4
// Wydarzenie 1
// Team 1
const userEvent3 = {
  _id: ObjectId('200000000000000000000003'),
  eventId: ObjectId('300000000000000000000001'),
  teamId: ObjectId('400000000000000000000001'),
  role: 'teamMember',
  nickname: 'Nick 3',
  isBanned: false,
};

// user4
// Wydarzenie 2
const userEvent4 = {
  _id: ObjectId('200000000000000000000004'),
  eventId: ObjectId('300000000000000000000002'),
  teamId: null,
  role: 'creator',
  nickname: 'Nick 4',
  isBanned: false,
};

// user5
// Wydarzenie 1
// Team 2
const userEvent5 = {
  _id: ObjectId('200000000000000000000005'),
  eventId: ObjectId('300000000000000000000001'),
  teamId: ObjectId('400000000000000000000002'),
  role: 'teamLeader',
  nickname: 'Nick 5',
  isBanned: true,
};

// user6
// Wydarzenie 1
const userEvent6 = {
  _id: ObjectId('200000000000000000000006'),
  eventId: ObjectId('300000000000000000000001'),
  teamId: null,
  role: 'admin',
  nickname: 'Nick 6',
  isBanned: false,
};

// user6
// Wydarzenie 2
const userEvent7 = {
  _id: ObjectId('200000000000000000000007'),
  eventId: ObjectId('300000000000000000000002'),
  teamId: null,
  role: 'observer',
  nickname: 'Nick 7',
  isBanned: false,
};

// user7
// Wydarzenie 1
// Team 1
const userEvent8 = {
  _id: ObjectId('200000000000000000000008'),
  eventId: ObjectId('300000000000000000000001'),
  teamId: ObjectId('400000000000000000000001'),
  role: 'teamMember',
  nickname: 'Nick 8',
  isBanned: false,
};

// user7
// Wydarzenie 2
// Team 3
const userEvent9 = {
  _id: ObjectId('200000000000000000000009'),
  eventId: ObjectId('300000000000000000000002'),
  teamId: ObjectId('400000000000000000000003'),
  role: 'teamLeader',
  nickname: 'Nick 9',
  isBanned: false,
};

// user7
// Wydarzenie 3
const userEvent10 = {
  _id: ObjectId('200000000000000000000010'),
  eventId: ObjectId('300000000000000000000003'),
  teamId: null,
  role: 'creator',
  nickname: 'Nick 10',
  isBanned: false,
};

// user8
// Wydarzenie 1
// Team 2
const userEvent11 = {
  _id: ObjectId('200000000000000000000011'),
  eventId: ObjectId('300000000000000000000001'),
  teamId: ObjectId('400000000000000000000002'),
  role: 'teamMember',
  nickname: 'Nick 11',
  isBanned: false,
};

// user8
// Wydarzenie 2
// Team 3
const userEvent12 = {
  _id: ObjectId('200000000000000000000012'),
  eventId: ObjectId('300000000000000000000002'),
  teamId: ObjectId('400000000000000000000003'),
  role: 'teamMember',
  nickname: 'Nick 12',
  isBanned: false,
};

// user8
// Wydarzenie 3
// Team 4
const userEvent13 = {
  _id: ObjectId('200000000000000000000013'),
  eventId: ObjectId('300000000000000000000003'),
  teamId: ObjectId('400000000000000000000004'),
  role: 'teamLeader',
  nickname: 'Nick 13',
  isBanned: false,
};

module.exports = [
  userEvent1,
  userEvent2,
  userEvent3,
  userEvent4,
  userEvent5,
  userEvent6,
  userEvent7,
  userEvent8,
  userEvent9,
  userEvent10,
  userEvent11,
  userEvent12,
  userEvent13,
];
