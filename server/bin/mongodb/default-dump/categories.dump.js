const { ObjectId } = require('mongodb');

// Wydarzenie 1
const category1 = {
  _id: ObjectId('700000000000000000000001'),
  eventId: ObjectId('300000000000000000000001'),
  categoryName: 'Kategoria 1',
  pointValue: 2,
  pointStrokeColor: '#007700',
  pointFillColor: '#FF0000',
  categoryDescription: 'Lorem ipsum dolor sit amet',
};

// Wydarzenie 1
const category2 = {
  _id: ObjectId('700000000000000000000002'),
  eventId: ObjectId('300000000000000000000001'),
  categoryName: 'Kategoria 2',
  pointValue: 4,
  pointStrokeColor: '#C863DE',
  pointFillColor: '#3AA5FF',
  categoryDescription: 'Lorem ipsum dolor sit amet',
};

// Wydarzenie 1
const category3 = {
  _id: ObjectId('700000000000000000000003'),
  eventId: ObjectId('300000000000000000000001'),
  categoryName: 'Kategoria 3',
  pointValue: 5,
  pointStrokeColor: '#000000',
  pointFillColor: '#FEB300',
  categoryDescription: null,
};

// Wydarzenie 2
const category4 = {
  _id: ObjectId('700000000000000000000004'),
  eventId: ObjectId('300000000000000000000002'),
  categoryName: 'Kategoria 4',
  pointValue: 3,
  pointStrokeColor: '#000000',
  pointFillColor: '#FEB300',
  categoryDescription: null,
};

// Wydarzenie 2
const category5 = {
  _id: ObjectId('700000000000000000000005'),
  eventId: ObjectId('300000000000000000000002'),
  categoryName: 'Kategoria 5',
  pointValue: 1,
  pointStrokeColor: '#007700',
  pointFillColor: '#000000',
  categoryDescription: 'Lorem ipsum dolor sit amet',
};

// Wydarzenie 3
const category6 = {
  _id: ObjectId('700000000000000000000006'),
  eventId: ObjectId('300000000000000000000003'),
  categoryName: 'Kategoria 6',
  pointValue: 7,
  pointStrokeColor: '#000000',
  pointFillColor: '#007700',
  categoryDescription: 'Lorem ipsum dolor sit amet',
};

// Wydarzenie 3
const category7 = {
  _id: ObjectId('700000000000000000000007'),
  eventId: ObjectId('300000000000000000000003'),
  categoryName: 'Kategoria 7',
  pointValue: 6,
  pointStrokeColor: '#7308A5',
  pointFillColor: '#FF0000',
  categoryDescription: 'Lorem ipsum dolor sit amet',
};

module.exports = [
  category1,
  category2,
  category3,
  category4,
  category5,
  category6,
  category7,
];
