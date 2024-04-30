import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";


describe('CheckService Multiple UseCase testing', () => {

  const mockRepo1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }

  const mockRepo2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }
  
  const mockRepo3 = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }

  const mockRepoArray = [mockRepo1, mockRepo2, mockRepo3];

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkServiceMultTest = new CheckServiceMultiple(
    mockRepoArray, 
    successCallback, 
    errorCallback
  )

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('Should call success callback when fetch returns true', async () => {

    const url = 'https://www.google.com'
    
    const checkedService = await checkServiceMultTest.execute(url);

    expect(checkedService).toBeTruthy();
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))

  })

  test('Should call error callback when fetch fails', async () => {

    const url = 'https://www.googeedsle.com'
    
    const checkedService = await checkServiceMultTest.execute(url);

    expect(checkedService).toBeFalsy();
    expect(errorCallback).toHaveBeenCalled();
    expect(successCallback).not.toHaveBeenCalled();

    expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))

  })

})