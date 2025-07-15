const mongoose = require('mongoose');
const { MongoMemoryServer } = require("mongodb-memory-server");

// const mongoServer = new MongoMemoryServer();
let mongoServer
/**
 * Connect to the in-memory database.
 */
module.exports.connect = async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = await mongoServer.getUri();

    console.log("Using in-memory mongoDB URI", uri);
    const mongooseOpts = {
        serverSelectionTimeoutMS: 5000,
    };

    await mongoose.connect(uri, mongooseOpts);
};

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async () => {
    
    if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }

  if (mongoServer) {
    await mongoServer.stop();
  }
};

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
};
