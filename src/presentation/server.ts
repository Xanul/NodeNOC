import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { envs } from "../config/plugins/envs.plugin";
import { EmailService } from './email/email.serv';
import { SendEmailLogs } from "../domain/use-cases/email/sned-email-logs";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

// const currentLogRepository = new LogRepositoryImpl(
//   // new FileSystemDatasource()
//   // new MongoLogDatasource()
//   new PostgresLogDatasource()
// );

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgresLogRepository = new LogRepositoryImpl(new PostgresLogDatasource());
const dataSourcesArray = [fsLogRepository, mongoLogRepository, postgresLogRepository];

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
    //     const url = "http://google.com";
    //     new CheckService(
    //       currentLogRepository,
    //       () => console.log(`${url} is OK`),
    //       (error) => console.log(`${error}`)
    //     ).execute(url);
    //   }
    // );

    CronService.createJob(
      "*/3 * * * * *",
      () => {
        const url = "http://google.com";
        new CheckServiceMultiple(
          dataSourcesArray,
          () => console.log(`${url} is OK`),
          (error) => console.log(`${error}`)
          ).execute(url);
      }
    );

  }
}

