import { envs } from "./envs.plugin";

describe('Test on envs.pluging.ts', () => {

  test('Should return an object with the envs', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'rivas.060@gmail.com',
      MAILER_SECRET_KEY: 'sonhustxhiwnlyvv',
      PROD: true,
      MONGO_URL: 'mongodb://xanul:123456789@localhost:27017/',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'xanul',
      MONGO_PASS: '123456789'
    })
  });
  
  test('Should return error if not found env', async () => {

    jest.resetModules();
    process.env.PORT = 'ABC';
    try {
      await import('./envs.plugin');
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('env-var: "PORT" should be a valid integer');
    }

  });

});