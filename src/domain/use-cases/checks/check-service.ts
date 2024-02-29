interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {

  constructor(
    private readonly SuccessCallback: SuccessCallback,
    private readonly ErrorCallback: ErrorCallback
  ) {};

  public async execute(url: string):Promise<boolean> {

    try {
      
      const req = await fetch(url);
      if (!req.ok) throw new Error(`Error on check service on: ${url}`);
      this.SuccessCallback();
      return true;

    } catch (error) {
      this.ErrorCallback(`${error}`);
      return false
    }


  }

}