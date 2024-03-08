import { EmailService } from "../../../presentation/email/email.serv";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {

  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ){}

  async execute(to: string | string[]) {

    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
      const sent2 = await this.emailService.sendEmail({
        to: to,
        subject: 'Testing Email',
        htmlBody: 'Esto es una prueba',
      })
      if(!sent) throw new Error('Email log was not send');
      
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Log Email Send',
        origin: 'send-email-logs.ts'
      });
      this.logRepository.saveLog(log);

      return true;

    } catch (error) {
      
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: 'Error creating the log',
        origin: 'send-email-logs.ts'
      });
      
      this.logRepository.saveLog(log);

      return false
    }


  }

}