const { ObjectId } = require('mongodb');

const pointDuration = {
  startDate: null,
  endDate: null,
};

// Wydarzenie 1
const point1 = {
  _id: ObjectId('600000000000000000000001'),
  eventId: ObjectId('300000000000000000000001'),
  pointCategoryId: ObjectId('700000000000000000000001'),
  pointKey: 'Po01',
  pointName: 'Punkt 1',
  pointType: 'permanent',
  pointCollectedDate: new Date(2022, 0, 1).getTime(),
  pointDuration,
  pointPosition: {
    longitude: 10,
    latitude: 10,
  },
};

// Wydarzenie 1
const point2 = {
  _id: ObjectId('600000000000000000000002'),
  eventId: ObjectId('300000000000000000000001'),
  pointCategoryId: ObjectId('700000000000000000000002'),
  pointKey: 'Po02',
  pointName: null,
  pointType: 'timeout',
  pointCollectedDate: new Date(2022, 0, 2).getTime(),
  pointDuration: {
    startDate: Date.now(),
    endDate: new Date(2050, 0).getTime(),
  },
  pointPosition: {
    longitude: 10,
    latitude: 10,
  },
};

// Wydarzenie 1
const point3 = {
  _id: ObjectId('600000000000000000000003'),
  eventId: ObjectId('300000000000000000000001'),
  pointCategoryId: ObjectId('700000000000000000000001'),
  pointKey: 'Po03',
  pointName: null,
  pointType: 'permanent',
  pointCollectedDate: new Date(2022, 0, 3).getTime(),
  pointDuration,
  pointPosition: {
    longitude: 10,
    latitude: 10,
  },
};

// Wydarzenie 1
const point4 = {
  _id: ObjectId('600000000000000000000004'),
  eventId: ObjectId('300000000000000000000001'),
  pointCategoryId: ObjectId('700000000000000000000001'),
  pointKey: 'Po04',
  pointName: 'Punkt 4',
  pointType: 'permanent',
  pointCollectedDate: new Date(2022, 0, 2).getTime(),
  pointDuration,
  pointPosition: {
    longitude: 10,
    latitude: 10,
  },
};

// Wydarzenie 1
const point5 = {
  _id: ObjectId('600000000000000000000005'),
  eventId: ObjectId('300000000000000000000001'),
  pointCategoryId: ObjectId('700000000000000000000002'),
  pointKey: 'Po05',
  pointName: 'Punkt 5',
  pointType: 'timeout',
  pointCollectedDate: null,
  pointDuration: {
    startDate: new Date(2021, 0).getTime(),
    endDate: Date.now(),
  },
  pointPosition: {
    longitude: 10,
    latitude: 10,
  },
};

// Wydarzenie 1
const point6 = {
  _id: ObjectId('600000000000000000000006'),
  eventId: ObjectId('300000000000000000000001'),
  pointCategoryId: ObjectId('700000000000000000000003'),
  pointKey: 'Po06',
  pointName: null,
  pointType: 'permanent',
  pointCollectedDate: null,
  pointDuration,
  pointPosition: {
    longitude: 10,
    latitude: 10,
  },
};

// Wydarzenie 1
const point7 = {
  _id: ObjectId('600000000000000000000007'),
  eventId: ObjectId('300000000000000000000001'),
  pointCategoryId: ObjectId('700000000000000000000001'),
  pointKey: 'Po07',
  pointName: 'Punkt 7',
  pointType: 'timeout',
  pointCollectedDate: null,
  pointDuration: {
    startDate: Date.now(),
    endDate: new Date(2050, 0).getTime(),
  },
  pointPosition: {
    longitude: 10,
    latitude: 10,
  },
};

// Wydarzenie 2
const point8 = {
  _id: ObjectId('600000000000000000000008'),
  eventId: ObjectId('300000000000000000000002'),
  pointCategoryId: ObjectId('700000000000000000000004'),
  pointKey: 'Po08',
  pointName: null,
  pointType: 'permanent',
  pointCollectedDate: null,
  pointDuration,
  pointPosition: {
    longitude: 10,
    latitude: 10,
  },
};

// Wydarzenie 2
const point9 = {
  _id: ObjectId('600000000000000000000009'),
  eventId: ObjectId('300000000000000000000002'),
  pointCategoryId: ObjectId('700000000000000000000004'),
  pointKey: 'Po09',
  pointName: null,
  pointType: 'permanent',
  pointCollectedDate: null,
  pointDuration,
  pointPosition: {
    longitude: 10,
    latitude: 10,
  },
};

// Wydarzenie 3
const point10 = {
  _id: ObjectId('600000000000000000000010'),
  eventId: ObjectId('300000000000000000000003'),
  pointCategoryId: ObjectId('700000000000000000000006'),
  pointKey: 'Po10',
  pointName: null,
  pointType: 'timeout',
  pointCollectedDate: new Date(2021, 11).getTime(),
  pointDuration: {
    startDate: new Date(2021, 10).getTime(),
    endDate: Date.now(),
  },
  pointPosition: {
    longitude: 10,
    latitude: 10,
  },
};

// Wydarzenie 3
const point11 = {
  _id: ObjectId('600000000000000000000011'),
  eventId: ObjectId('300000000000000000000003'),
  pointCategoryId: ObjectId('700000000000000000000007'),
  pointKey: 'Po11',
  pointName: null,
  pointType: 'permanent',
  pointCollectedDate: new Date(2021, 10).getTime(),
  pointDuration,
  pointPosition: {
    longitude: 10,
    latitude: 10,
  },
};

// Wydarzenie 3
const point12 = {
  _id: ObjectId('600000000000000000000012'),
  eventId: ObjectId('300000000000000000000003'),
  pointCategoryId: ObjectId('700000000000000000000007'),
  pointKey: 'Po12',
  pointName: null,
  pointType: 'permanent',
  pointCollectedDate: null,
  pointDuration,
  pointPosition: {
    longitude: 10,
    latitude: 10,
  },
};

module.exports = [
  point1,
  point2,
  point3,
  point4,
  point5,
  point6,
  point7,
  point8,
  point9,
  point10,
  point11,
  point12,
];
