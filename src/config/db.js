const client = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'CDP';
const COLLECTION_NAME = "projects"

module.exports = {
  client,
  url,
  dbName,
  COLLECTION_NAME
}
