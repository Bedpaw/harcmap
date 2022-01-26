const { ObjectId } = require('mongodb');

const eventDuration = {
  startDate: new Date(2020, 0, 1, 10, 23, 59).getTime(),
  endDate: new Date(2050, 4, 30, 23, 59, 59).getTime(),
};

const event1 = {
  _id: ObjectId('300000000000000000000001'),
  eventName: 'Wydarzenie 1',
  eventDuration,
  mapProperties: {
    zoom: 10,
    longitude: 10,
    latitude: 10,
  },
  eventRefreshTime: 60,
};

const event2 = {
  _id: ObjectId('300000000000000000000002'),
  eventName: 'Wydarzenie 2',
  eventDuration,
  mapProperties: {
    zoom: 20,
    longitude: 10,
    latitude: 10,
  },
  eventRefreshTime: 120,
};

const event3 = {
  _id: ObjectId('300000000000000000000003'),
  eventName: 'Wydarzenie 3',
  eventDuration,
  mapProperties: {
    zoom: 20,
    longitude: 20,
    latitude: 20,
  },
  eventRefreshTime: 180,
};

module.exports = [
  event1,
  event2,
  event3,
];
