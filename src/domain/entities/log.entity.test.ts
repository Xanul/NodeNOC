import { LogEntity, LogSeverityLevel } from "./log.entity";

describe('Log Entity', () => {

  const optionsObject = {
    message: 'Hola Mundo',
    level: LogSeverityLevel.low,
    origin: 'log.entity.test'
  }

  test('should create a new log entity instance', () => {
    

    const log = new LogEntity(optionsObject)

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(optionsObject.message);
    expect(log.level).toBe(optionsObject.level);
    expect(log.origin).toBe(optionsObject.origin);
    expect(log.createdAt).toBeInstanceOf(Date);

  });

  test('should create a LogEntity instance from JSON', () => {

    const jsonTest = `{"level":"low","message":"Service for http://google.com is OK","createdAt":"2024-03-26T15:33:22.188Z","origin":"check-service.ts"}`

    const log = LogEntity.fromJson(jsonTest);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe('Service for http://google.com is OK');
    expect(log.level).toBe(LogSeverityLevel.low);
    expect(log.origin).toBe('check-service.ts');
    expect(log.createdAt).toBe("2024-03-26T15:33:22.188Z");

  })

  test('should create a LogEntity instance from object', () => {

    const log = LogEntity.fromObject(optionsObject);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(optionsObject.message);
    expect(log.level).toBe(optionsObject.level);
    expect(log.origin).toBe(optionsObject.origin);
    // expect(log.createdAt).toBeInstanceOf(Date);

  })

});