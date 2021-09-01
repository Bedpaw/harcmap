// Select database
db = db.getSiblingDB('harcmap');

/**
 * This are example data for tests
 */
// Create user in "users" collection
db.users.insert({
  'username': 'user1',
  'email': 'example@domain.com',
  // password: Password1
  'password': '61a73c554fd0a2024eb3bffb06a597ef5095764ab049d8440c683f0ccd4e77d5a737fa90358664006cfa13c3b839028e63fc82f77e652730524c111efac95073',
});
