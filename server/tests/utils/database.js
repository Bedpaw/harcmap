/**
 * @description Module using only for tests purposes
 */
const { MongoClient } = require('mongodb');
const insertDefaultData = require('../../bin/mongodb/default-dump.js');
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
 * @description Add document to database
 * @param collectionName {string}
 * @param query {object}
 * @return {Promise<void>}
 */
async function find (collectionName, query) {

  const collection = await getCollection(collectionName);
  return await collection.findOne(query);
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
