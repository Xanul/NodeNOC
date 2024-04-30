import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
import { LogDatasource } from './log.datasource';

describe('log.datasource.ts LogDatasource', () => {

  const newLog = new LogEntity({
    origin: 'log.datasource.ts',
    message: 'This is a test log message',
    level: LogSeverityLevel.low
  });

  class MockLogDatasource extends LogDatasource{
    async saveLog(log: LogEntity): Promise<void> {
      return
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog]
    }
    
  }
  

  test('Should test the abstract class LogDatasource', async () => {

   const mockLogDatasource = new MockLogDatasource();

   expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
   expect(mockLogDatasource).toHaveProperty('saveLog');
   expect(mockLogDatasource).toHaveProperty('getLogs');

   await mockLogDatasource.saveLog(newLog);

   const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high);
  
   expect(logs).toHaveLength(1);
   expect(logs[0]).toBeInstanceOf(LogEntity);

  });

})