import mongoose from "mongoose";
import { envs } from "../../../config/plugins/envs.plugin";
import { MongoDatabase } from "../init";
import { LogModel } from "./log.model";

describe('Test on log.model', () => {

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoURL: envs.MONGO_URL
    });
  });

  afterAll(()=> {
    
    mongoose.connection.close();
  })

  test('Should return a LogModel', async () => {
    
    const logData = {
      origin: 'log.model.test.ts',
      message: 'Test on log.model',
      level: 'low'
    }
    const log = await LogModel.create(logData);

    expect(log).toEqual(expect.objectContaining({
      ...logData,
      id: expect.any(String),
      createdAt: expect.any(Date),
    }));

    await LogModel.findOneAndDelete({ _id: log.id });

  });

  test('Should return the schema object', () => {

    const schema = LogModel.schema.obj;

    expect(schema).toEqual(expect.objectContaining({
      message: { type: expect.any(Function), required: true },
      origin: { type: expect.any(Function) },
      level: {
        type: expect.any(Function),
        enum: [ 'low', 'medium', 'high' ],
        default: 'low'
      },
      createdAt: { type: expect.any(Function), default: expect.any(Date) }
    }));

  });

});
