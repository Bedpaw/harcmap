const mongodb = require('mongodb');

let store = [];

function insertMany (arrayOfItems) {
  store = arrayOfItems;
  return {
    insertedCount: arrayOfItems.length,
    ops: arrayOfItems,
  };
}

function find () {

}

function findOne () {
  return store[0];
}

function updateMany () {

}

function deleteOne () {

}

function setDocument (document) {
  store.push(document);
}

const MongoClient = {
  connect: () => ({
    db: () => ({
      collection: () => ({
        find,
        findOne,
        insertMany,
        updateMany,
        deleteOne,
      }),
    }),
  }),
};

module.exports = {
  MongoClient,
  ObjectId: mongodb.ObjectId,
  setDocument,
};
