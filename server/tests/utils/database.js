/**
 * @description Module using only for tests purposes
 */
const { MongoClient } = require('mongodb');
const users = require('../../bin/mongodb/default-dump/users.dump.js');
const usersEvents = require('../../bin/mongodb/default-dump/usersEvents.dump.js');
const events = require('../../bin/mongodb/default-dump/events.dump.js');
const teams = require('../../bin/mongodb/default-dump/teams.dump.js');
const keys = require('../../bin/mongodb/default-dump/keys.dump.js');
const categories = require('../../bin/mongodb/default-dump/categories.dump.js');
const points = require('../../bin/mongodb/default-dump/points.dump.js');
const {
  MONGO_HOST,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_DATABASE,
  MONGO_PORT,
} = process.env;

const connectionString = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;
// Connection handler(also connection pooling)
let connectionHandler;

/**
 * @private
 * @description Function connecting to database and creating handler
 * @return {Promise<*>} - reference to database connection
 */
async function connectToDatabase () {
  // Create connection handler
  if (!connectionHandler) {
    connectionHandler = await MongoClient.connect(connectionString, { useUnifiedTopology: true });
  }

  return connectionHandler;
}

/**
 * @public
 * @description Function connecting to database, given collection. Using "connectToDatabase"
 * @param collectionName {string}
 * @return {Promise<*>} - return mongodb collection object
 */
async function getCollection (collectionName) {
  const connection = await connectToDatabase();
  const db = connection.db(MONGO_DATABASE);

  return db.collection(collectionName);
}

/**
 * @description Add document to database
 * @param options {collectionName:string, document:object}
 * @return {Promise<void>}
 */
async function add (options) {
  const {
    collectionName,
    document,
  } = options;

  const collection = await getCollection(collectionName);
  await collection.insertOne(document);
}

/**
 * @description Get document from database
 * @param collectionName {string}
 * @param query {object}
 * @return {Promise<void>}
 */
async function find (collectionName, query) {

  const collection = await getCollection(collectionName);
  return await collection.findOne(query);
}

/**
 * @description Insert data from default dump
 * @param db {object} reference to database
 */
async function insertDefaultData (db) {
  await db.collection('users').insertMany(users);
  await db.collection('usersEvents').insertMany(usersEvents);
  await db.collection('events').insertMany(events);
  await db.collection('teams').insertMany(teams);
  await db.collection('keys').insertMany(keys);
  await db.collection('categories').insertMany(categories);
  await db.collection('points').insertMany(points);
}

/**
 * @description Clear all collections and return data to default
 */
async function clearToDefault () {
  const connection = await connectToDatabase();
  const db = connection.db(MONGO_DATABASE);

  // clear collections
  const collections = await db.listCollections().toArray();
  const collectionsLength = collections.length;

  for (let i = 0; i < collectionsLength; i += 1) {
    const eachCollectionName = collections[i].name;

    await db.collection(eachCollectionName).drop();
  }

  // load default data
  await insertDefaultData(db);
}

module.exports = {
  add,
  find,
  clearToDefault,
};
