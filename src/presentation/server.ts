import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../domain/use-cases/checks/check-service";

export class Server {
  public static start() {
    console.log("Server started...");

    CronService.createJob(
      "*/3 * * * * *",
      () => {
        const date = new Date();
        new CheckService(
          () => console.log(`Service running on: ${date.toISOString()}`),
          (error) => console.log(`${error}`)
        ).execute("https://www.google.com");
        // new CheckService().execute("http://localhost:3000");
      }
    );
  }
}

