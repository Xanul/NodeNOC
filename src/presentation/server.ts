import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";

export class Server {
  public static start() {
    console.log("Server started...");

    CronService.createJob(
      "*/5 * * * * *",
      () => {
        const date = new Date();
        console.log("5 Seconds Cron Job", date);
      }
    );
    CronService.createJob(
      "*/3 * * * * *",
      () => {
        const date = new Date();
        console.log("3 Seconds Cron Job", date);
      }
    );
    CronService.createJob(
      "*/2 * * * * *",
      () => {
        const date = new Date();
        console.log("2 Seconds Cron Job", date);
      }
    );
  }
}

