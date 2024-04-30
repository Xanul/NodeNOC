import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service"


describe('CheckService UseCase testing', () => {

  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }

  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkServiceTest = new CheckService(
    mockRepository,
    successCallback,
    errorCallback
  )

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('Should call success callback when fetch returns true', async () => {

    const url = 'https://www.google.com'
    
    const checkedService = await checkServiceTest.execute(url);

    expect(checkedService).toBeTruthy();
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();

    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))

  })

  test('Should call error callback when fetch fails', async () => {

    const url = 'https://www.googeedsle.com'
    
    const checkedService = await checkServiceTest.execute(url);

    expect(checkedService).toBeFalsy();
    expect(errorCallback).toHaveBeenCalled();
    expect(successCallback).not.toHaveBeenCalled();

    // expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))

  })

})