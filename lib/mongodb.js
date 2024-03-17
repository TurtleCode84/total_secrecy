const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env['MONGODB_URI'];

let client;
let clientPromise;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
clientPromise = client.connect();

module.exports = clientPromise;