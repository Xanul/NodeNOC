import { EmailService } from "../../../presentation/email/email.serv"
import { LogEntity } from "../../entities/log.entity"
import { SendEmailLogs } from "./send-email-logs"

describe('Testing on send-email-logs', () => {
  
  
  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
  }

  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks();
  })

  const sendEmail = new SendEmailLogs(
    mockEmailService as any, 
    mockLogRepository
  );

  test('SendEmailLogs should call saveLog when email is sent', async () => {

    const successSent = await sendEmail.execute('rivas@gmail.com');

    expect(successSent).toBe(true);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "low",
      message: "Log Email Send",
      origin: "send-email-logs.ts"
    })
    

  })

  test('SendEmailLogs should call saveLog when email is not sent', async () => {

    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

    const successSent = await sendEmail.execute('rivas@gmail.com');

    expect(successSent).toBe(false);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "high",
      message: "Error creating the log",
      origin: "send-email-logs.ts"
    })
    

  })

  

})