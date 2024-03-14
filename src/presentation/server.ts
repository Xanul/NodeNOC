import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { envs } from "../config/plugins/envs.plugin";
import { EmailService } from './email/email.serv';
import { SendEmailLogs } from "../domain/use-cases/email/sned-email-logs";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";

const currentLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
  // new MongoLogDatasource()
);
const emailServ = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started...");

    // const emailSent = new SendEmailLogs(new EmailService(), fileSystemLogRepository)
    //   .execute('darunia.the.druid@gmail.com');

    // const emailService = new EmailService();
    // emailService.sendEmailWithFileSystemLogs('darunia.the.druid@gmail.com')
    
    // CronService.createJob(
    //   "*/3 * * * * *",
    //   () => {
    //     const url = "http://googleeesdasdfdf.com";
    //     new CheckService(
    //       currentLogRepository,
    //       () => console.log(`${url} is OK`),
    //       (error) => console.log(`${error}`)
    //     ).execute(url);
    //   }
    // );
  }
}

