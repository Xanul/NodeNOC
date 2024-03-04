import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { envs } from "../config/plugins/envs.plugin";
import { EmailService } from './email/email.serv';

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource());

export class Server {
  public static start() {
    console.log("Server started...");

    // Send Email
    // const emailService = new EmailService();
    // emailService.sendEmailWithFileSystemLogs(
    //   ['darunia.the.druid@gmail.com', 'rivas.060@gmail.com']
    // )

    // CronService.createJob(
    //   "*/3 * * * * *",
    //   () => {
    //     const url = "http://localhost:3000";
    //     new CheckService(
    //       fileSystemLogRepository,
    //       () => console.log(`${url} is OK`),
    //       (error) => console.log(`${error}`)
    //     ).execute(url);
    //     // new CheckService().execute("http://localhost:3000");
    //   }
    // );
  }
}

