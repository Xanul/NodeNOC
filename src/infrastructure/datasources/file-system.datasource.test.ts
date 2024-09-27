import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('Test on file-system datasource', () => {

  const logPath = path.join(__dirname, '../../../logs');
  
  beforeEach(() => {
    fs.rmSync(logPath, {recursive: true, force: true});
  });

  test('Should create log files if they do not exist', () => {

    new FileSystemDatasource();

    const files = fs.readdirSync(logPath);

    expect(files).toEqual(['logs-high.log', 'logs-low.log', 'logs-medium.log']);

  });

  test('Should save a log in logs-low.log', () => {

    const fsDatasource = new FileSystemDatasource();
    
    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: 'Testing from file-system.datasource.ts LOW LEVEL',
      origin: 'file-system.datasource.ts'
    })

    fsDatasource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8');

    expect(allLogs).toContain(JSON.stringify(log));

  })

  test('Should save a log in logs-low.log and logs-medium.log', () => {

    const fsDatasource = new FileSystemDatasource();

    const logMedium = new LogEntity({
      level: LogSeverityLevel.medium,
      message: 'Testing from file-system.datasource.ts MEDIUM LEVEL',
      origin: 'file-system.datasource.ts'
    })

    fsDatasource.saveLog(logMedium);

    const allLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
    expect(allLogs).toContain(JSON.stringify(logMedium));

  })

  test('Should save a log in logs-low.log and logs-high.log', () => {

    const fsDatasource = new FileSystemDatasource();
  
    const logHigh = new LogEntity({
      level: LogSeverityLevel.high,
      message: 'Testing from file-system.datasource.ts HIGH LEVEL',
      origin: 'file-system.datasource.ts'
    })

    fsDatasource.saveLog(logHigh);

    const allLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');
    expect(allLogs).toContain(JSON.stringify(logHigh));

  })

  test('Should return all logs', async () => {

    const fsDatasource = new FileSystemDatasource();

    const logLow = new LogEntity({
      level: LogSeverityLevel.low,
      message: 'Testing from file-system.datasource.ts LOW LEVEL',
      origin: 'file-system.datasource.ts'
    })
  
    const logMedium = new LogEntity({
      level: LogSeverityLevel.medium,
      message: 'Testing from file-system.datasource.ts MEDIUM LEVEL',
      origin: 'file-system.datasource.ts'
    })
  
    const logHigh = new LogEntity({
      level: LogSeverityLevel.high,
      message: 'Testing from file-system.datasource.ts HIGH LEVEL',
      origin: 'file-system.datasource.ts'
    })

    await fsDatasource.saveLog(logLow);
    await fsDatasource.saveLog(logMedium);
    await fsDatasource.saveLog(logHigh);

    const fetchedLogsLow = await fsDatasource.getLogs(LogSeverityLevel.low);


    // const fetchedLogsMedium = await fsDatasource.getLogs(LogSeverityLevel.medium);
    // const fetchedLogsHigh = await fsDatasource.getLogs(LogSeverityLevel.high);

    expect(fetchedLogsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]));
    // expect(fetchedLogsMedium).toEqual(expect.arrayContaining([logMedium]));

  })



})