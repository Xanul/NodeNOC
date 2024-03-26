import mongoose from "mongoose";
import { MongoDatabase } from "./init";


describe('Test on mongo.init', () => {

  afterAll(async () => {
      mongoose.connection.close();
  });

  test('Should connect to mongo database', async () => {

    const connected = await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoURL: process.env.MONGO_URL!
    });

    expect(connected).toBeTruthy();

  });

  test('Should throw an error when connection fails', async () => {

    try {

      await MongoDatabase.connect({
        dbName: 'fake-db',
        mongoURL: 'fake-url'
      });

    } catch (error) {

      expect(error).toBeDefined();

    }

  });

});