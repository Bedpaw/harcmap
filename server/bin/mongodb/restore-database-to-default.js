// const path = require('path');
// require('dotenv').config({ path: path.join(__dirname, '../../.env.tests') });
const { env } = process;

env.MONGO_HOST = 'localhost';
env.MONGO_USER = 'user';
env.MONGO_PASSWORD = 'password';
env.MONGO_DATABASE = 'harcmap';
env.MONGO_PORT = '27017';

const database = require('./utils');

database.clearToDefault()
  .then(() => {
    process.exit(0);
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  });
