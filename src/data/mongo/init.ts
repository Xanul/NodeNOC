import mongoose from "mongoose";

interface ConnectionOptions {
  mongoURL: string;
  dbName: string;
}

export class MongoDatabase {

  static async connect(options: ConnectionOptions) {

    const {dbName, mongoURL} = options;

    try {
      
      await mongoose.connect(mongoURL, {
        dbName: dbName,
      })

      console.log('MongoDB Connected')

    } catch (error) {
      console.log('Mongo Connection Error');
      throw error;
    }

  }

}