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
  pointKey: 'Poi1',
  pointName: 'Punkt 1',
  pointType: 'permanent',
  pointCollectedDate: new Date(2022, 0, 1).getTime(),
  pointDuration,
  pointPosition: {
    longitude: 18.542,
    latitude: 54.469,
  },
};

// Wydarzenie 1
const point2 = {
  _id: ObjectId('600000000000000000000002'),
  eventId: ObjectId('300000000000000000000001'),
  pointCategoryId: ObjectId('700000000000000000000002'),
  pointKey: 'Poi2',
  pointName: null,
  pointType: 'timeout',
  pointCollectedDate: null,
  pointDuration: {
    startDate: new Date(2021, 0, 14, 13, 32, 54).getTime(),
    endDate: new Date(2050, 0, 14, 13, 32, 54).getTime(),
  },
  pointPosition: {
    longitude: 18.543,
    latitude: 54.470,
  },
};

// Wydarzenie 1
const point3 = {
  _id: ObjectId('600000000000000000000003'),
  eventId: ObjectId('300000000000000000000001'),
  pointCategoryId: ObjectId('700000000000000000000001'),
  pointKey: 'Poi3',
  pointName: null,
  pointType: 'permanent',
  pointCollectedDate: new Date(2022, 0, 3, 3, 53, 24).getTime(),
  pointDuration,
  pointPosition: {
    longitude: 18.541,
    latitude: 54.464,
  },
};

// Wydarzenie 1
const point4 = {
  _id: ObjectId('600000000000000000000004'),
  eventId: ObjectId('300000000000000000000001'),
  pointCategoryId: ObjectId('700000000000000000000001'),
  pointKey: 'Poi4',
  pointName: 'Punkt 4',
  pointType: 'permanent',
  pointCollectedDate: new Date(2022, 0, 2, 16, 49, 1).getTime(),
  pointDuration,
  pointPosition: {
    longitude: 18.540,
    latitude: 54.469,
  },
};

// Wydarzenie 1
const point5 = {
  _id: ObjectId('600000000000000000000005'),
  eventId: ObjectId('300000000000000000000001'),
  pointCategoryId: ObjectId('700000000000000000000002'),
  pointKey: 'Poi5',
  pointName: 'Punkt 5',
  pointType: 'timeout',
  pointCollectedDate: null,
  pointDuration: {
    startDate: new Date(2021, 0, 7, 17, 12, 42).getTime(),
    endDate: new Date(2022, 0, 7, 17, 12, 42).getTime(),
  },
  pointPosition: {
    longitude: 18.548,
    latitude: 54.473,
  },
};

// Wydarzenie 1
const point6 = {
  _id: ObjectId('600000000000000000000006'),
  eventId: ObjectId('300000000000000000000001'),
  pointCategoryId: ObjectId('700000000000000000000003'),
  pointKey: 'Poi6',
  pointName: null,
  pointType: 'permanent',
  pointCollectedDate: null,
  pointDuration,
  pointPosition: {
    longitude: 18.545,
    latitude: 54.466,
  },
};

// Wydarzenie 1
const point7 = {
  _id: ObjectId('600000000000000000000007'),
  eventId: ObjectId('300000000000000000000001'),
  pointCategoryId: ObjectId('700000000000000000000001'),
  pointKey: 'Poi7',
  pointName: 'Punkt 7',
  pointType: 'timeout',
  pointCollectedDate: null,
  pointDuration: {
    startDate: new Date(2021, 0, 7, 17, 12, 42).getTime(),
    endDate: new Date(2050, 0, 1, 9, 1, 5).getTime(),
  },
  pointPosition: {
    longitude: 18.548,
    latitude: 54.461,
  },
};

// Wydarzenie 2
const point8 = {
  _id: ObjectId('600000000000000000000008'),
  eventId: ObjectId('300000000000000000000002'),
  pointCategoryId: ObjectId('700000000000000000000004'),
  pointKey: 'Poi8',
  pointName: null,
  pointType: 'permanent',
  pointCollectedDate: null,
  pointDuration,
  pointPosition: {
    longitude: 18.540,
    latitude: 54.460,
  },
};

// Wydarzenie 2
const point9 = {
  _id: ObjectId('600000000000000000000009'),
  eventId: ObjectId('300000000000000000000002'),
  pointCategoryId: ObjectId('700000000000000000000004'),
  pointKey: 'Poi9',
  pointName: null,
  pointType: 'permanent',
  pointCollectedDate: null,
  pointDuration,
  pointPosition: {
    longitude: 18.545,
    latitude: 54.465,
  },
};

// Wydarzenie 3
const point10 = {
  _id: ObjectId('600000000000000000000010'),
  eventId: ObjectId('300000000000000000000003'),
  pointCategoryId: ObjectId('700000000000000000000006'),
  pointKey: 'Po1i',
  pointName: null,
  pointType: 'timeout',
  pointCollectedDate: null,
  pointDuration: {
    startDate: new Date(2021, 9, 23, 15, 34, 23).getTime(),
    endDate: new Date(2022, 0, 7, 17, 12, 42).getTime(),
  },
  pointPosition: {
    longitude: 18.543,
    latitude: 54.479,
  },
};

// Wydarzenie 3
const point11 = {
  _id: ObjectId('600000000000000000000011'),
  eventId: ObjectId('300000000000000000000003'),
  pointCategoryId: ObjectId('700000000000000000000007'),
  pointKey: 'Po2i',
  pointName: null,
  pointType: 'permanent',
  pointCollectedDate: new Date(2021, 10, 25, 13, 4, 14).getTime(),
  pointDuration,
  pointPosition: {
    longitude: 18.549,
    latitude: 54.479,
  },
};

// Wydarzenie 3
const point12 = {
  _id: ObjectId('600000000000000000000012'),
  eventId: ObjectId('300000000000000000000003'),
  pointCategoryId: ObjectId('700000000000000000000007'),
  pointKey: 'Po3i',
  pointName: null,
  pointType: 'permanent',
  pointCollectedDate: null,
  pointDuration,
  pointPosition: {
    longitude: 18.540,
    latitude: 54.470,
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
