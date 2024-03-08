import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

interface Attachment {
  filename: string;
  path: string;
}

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachment?: Attachment[];
}

export class EmailService {

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachment = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachment,
      });

      return true;
    } catch (error) {

      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "Server Logs";
    const htmlBody = `
      <h3>Logs del sistema NOC</h3>
      <p>Pariatur ipsum aliqua qui esse culpa dolor. Nulla qui est voluptate velit est incididunt ad. Nostrud est eiusmod elit officia ex sint aliquip dolore ea ut duis aliqua non adipisicing. Culpa incididunt qui mollit mollit voluptate qui. Est mollit sint aliqua voluptate reprehenderit eiusmod excepteur aute laboris cupidatat eu aliquip anim et. Esse et fugiat aute reprehenderit sint exercitation dolore quis mollit quis qui qui tempor adipisicing.</p>
      <p>Ver logs adjuntos</p>
      `;
    const attachments: Attachment[] = [
      { filename: "logs-low.log", path: "./logs/logs-low.log" },
      { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
      { filename: "logs-high.log", path: "./logs/logs-high.log" },
    ];

    return this.sendEmail({ to, subject, attachment: attachments, htmlBody });
  }
}
