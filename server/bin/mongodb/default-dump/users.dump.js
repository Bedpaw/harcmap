const { ObjectId } = require('mongodb');
// DEFAULT VALUES
// PASS: Password1
const password = '61a73c554fd0a2024eb3bffb06a597ef5095764ab049d8440c683f0ccd4e77d5a737fa90358664006cfa13c3b839028e63fc82f77e652730524c111efac95073';
// 15.01.22 - 21:37
const accountCreated = 1642279069734;
const accountActivation = {
  isActive: true,
  key: null,
};
const passwordReset = {
  key: null,
  date: null,
};

/**
 * USER1
 */
const user1 = {
  _id: ObjectId('100000000000000000000001'),
  email: 'user1@harcmap.pl',
  password,
  accountActivation,
  passwordReset,
  accountCreated,
  userEvents: [ObjectId('200000000000000000000001')],
};

/**
 * USER2
 */
const user2 = {
  _id: ObjectId('100000000000000000000002'),
  email: 'user2@harcmap.pl',
  password,
  accountActivation: {
    isActive: false,
    key: 'e993b950c469ca8eb60e1e7a22027b943877ccb0bfdd30a60846f07d36830e7f657020da10e124ca09e3dccfcd7e59af74a31e08a74e8f210f69bd69c9fdaec0',
  },
  passwordReset,
  accountCreated,
  userEvents: [],
};

/**
 * USER3
 */
const user3 = {
  _id: ObjectId('100000000000000000000003'),
  email: 'user3@harcmap.pl',
  password,
  accountActivation,
  passwordReset: {
    key: '87daccad51d959e47ce23f36261f02af4ddf320e248f969b8271a4bb9ee1d1d9901015ff2e234771132b1baf7821c878547e6f843200045170586fc9a7ec7a96',
    // 15.01.22 - 21:37
    date: 1642279069734,
  },
  accountCreated,
  userEvents: [ObjectId('200000000000000000000002')],
};

/**
 * USER4
 */
const user4 = {
  _id: ObjectId('100000000000000000000004'),
  email: 'user4@harcmap.pl',
  password,
  accountActivation,
  passwordReset,
  accountCreated,
  userEvents: [ObjectId('200000000000000000000003'), ObjectId('200000000000000000000004')],
};

/**
 * USER5
 */
const user5 = {
  _id: ObjectId('100000000000000000000005'),
  email: 'user5@harcmap.pl',
  password,
  accountActivation,
  passwordReset,
  accountCreated,
  userEvents: [ObjectId('200000000000000000000005')],
};

/**
 * USER6
 */
const user6 = {
  _id: ObjectId('100000000000000000000006'),
  email: 'user6@harcmap.pl',
  password,
  accountActivation,
  passwordReset,
  accountCreated,
  userEvents: [ObjectId('200000000000000000000006'), ObjectId('200000000000000000000007')],
};

/**
 * USER7
 */
const user7 = {
  _id: ObjectId('100000000000000000000007'),
  email: 'user7@harcmap.pl',
  password,
  accountActivation,
  passwordReset,
  accountCreated,
  userEvents: [ObjectId('200000000000000000000008'), ObjectId('200000000000000000000009'), ObjectId('200000000000000000000010')],
};

/**
 * USER8
 */
const user8 = {
  _id: ObjectId('100000000000000000000008'),
  email: 'user8@harcmap.pl',
  password,
  accountActivation,
  passwordReset,
  accountCreated,
  userEvents: [ObjectId('200000000000000000000011'), ObjectId('200000000000000000000012'), ObjectId('200000000000000000000013')],
};

module.exports = [
  user1,
  user2,
  user3,
  user4,
  user5,
  user6,
  user7,
  user8,
];
