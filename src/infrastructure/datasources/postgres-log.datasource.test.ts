import { PrismaClient } from "@prisma/client";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PostgresLogDatasource } from "./postgres-log.datasource"

const prismaClient = new PrismaClient();
const postgreLogDatasource = new PostgresLogDatasource();

afterEach(async ()=> {

  await prismaClient.logModel.deleteMany({});

})

afterAll(async () => {
  await prismaClient.$disconnect();
})

describe("Test on postgre log datasource", () => {

  const testLog:LogEntity = {
    level: LogSeverityLevel.low,
    message: 'Test on postgre log datasource',
    origin: 'postgres-log-datasource.test.ts',
    createdAt: new Date()
  }
  
  test('Should save a log correctly', async () => {

    await postgreLogDatasource.saveLog(testLog);

    const savedLog = await prismaClient.logModel.findMany({
      where: {
        message: 'Test on postgre log datasource'
      }
    })

    expect(savedLog).toHaveLength(1);
    expect(savedLog[0].message).toBe('Test on postgre log datasource');

  })

  test('Should return a log array', async () => {

    await postgreLogDatasource.saveLog(testLog);
    await postgreLogDatasource.saveLog(testLog);
    await postgreLogDatasource.saveLog(testLog);

    const fetchedLogs = await postgreLogDatasource.getLogs(LogSeverityLevel.low);

    expect(fetchedLogs).toHaveLength(3);
    expect(fetchedLogs[0].message).toBe('Test on postgre log datasource');

  })

})