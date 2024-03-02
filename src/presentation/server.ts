import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource());

export class Server {
  public static start() {
    console.log("Server started...");

    CronService.createJob(
      "*/3 * * * * *",
      () => {
        const url = "http://google.com";
        new CheckService(
          fileSystemLogRepository,
          () => console.log(`${url} is OK`),
          (error) => console.log(`${error}`)
        ).execute(url);
        // new CheckService().execute("http://localhost:3000");
      }
    );
  }
}

