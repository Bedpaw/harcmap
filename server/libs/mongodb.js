const mongodb = require('mongodb');

const {
  MONGO_HOST,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_DATABASE,
  MONGO_PORT,
} = process.env;

const { MongoClient } = mongodb;
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

module.exports = {
  ObjectId: mongodb.ObjectId,
  getCollection,
};
