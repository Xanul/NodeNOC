import mongoose from "mongoose"
import { envs } from "../../config/plugins/envs.plugin"
import { LogModel, MongoDatabase } from "../../data/mongo"
import { MongoLogDatasource } from "./mongo-log.datasource"
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"


describe("Test on Mongo-log", () => {

  beforeAll(async () => {

    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoURL: envs.MONGO_URL
    })

  })

  afterEach(async () => {
    await LogModel.deleteMany();
  })

  afterAll(async () => {
    mongoose.connection.close();
  })
  
  const logDatasource = new MongoLogDatasource();

  const testLog = new LogEntity({
    level: LogSeverityLevel.medium,
    message: 'Testing mongo log datasource',
    origin: 'mongo-log-datasource.test.ts',
  })

  test("Should create a log", async () => {

    const logSpy = jest.spyOn(console, 'log');

    await logDatasource.saveLog(testLog);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith("Mongo Log Created", expect.any(String));

  })

  test("Should get logs", async () => {

    await logDatasource.saveLog(testLog);
    await logDatasource.saveLog(testLog);
    
    const fetchedLogs = await logDatasource.getLogs(LogSeverityLevel.medium);

    expect(fetchedLogs.length).toBe(2);
    expect(fetchedLogs[0].level).toBe(LogSeverityLevel.medium);

  })

})