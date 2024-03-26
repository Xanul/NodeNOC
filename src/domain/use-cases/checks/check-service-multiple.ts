import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

  constructor(
    private readonly logRepository: LogRepository[],
    private readonly SuccessCallback: SuccessCallback,
    private readonly ErrorCallback: ErrorCallback
  ) {};

  private callLogs(log:LogEntity) {
    this.logRepository.forEach(logRepo => {
      logRepo.saveLog(log)
    })
  }

  public async execute(url: string):Promise<boolean> {

    try {
      
      const req = await fetch(url);
      if (!req.ok) throw new Error(`Error on check service on: ${url}`);

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Service for ${url} is OK`,
        origin: 'check-service.ts'
      });

      this.callLogs(log)
      this.SuccessCallback && this.SuccessCallback();
      return true;

    } catch (error) {
      const errorMessage = `${error}`;
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `Service for ${url} is not Working`,
        origin: 'check-service.ts'
      });
      this.callLogs(log);
      this.ErrorCallback && this.ErrorCallback(errorMessage);
      return false
    }


  }

}