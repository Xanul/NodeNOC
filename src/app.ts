import { PrismaClient } from '@prisma/client';
import { envs } from './config/plugins/envs.plugin';
import { LogModel, MongoDatabase } from './data/mongo';
import { Server } from './presentation/server';

(async() => {
  main();
})();

async function main () {
  
  try {
    await MongoDatabase.connect({
      mongoURL: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME
    })
  } catch (error) {
    console.log("Unable to connect to the database", error);
  }

  // const prisma = new PrismaClient();
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: 'HIGH',
  //     message: 'Test Message Postgres',
  //     origin: 'App.ts'
  //   }
  // });

  // console.log(newLog);

  // const foundLogs = await prisma.logModel.findMany({
  //   where:{
  //     level: 'MEDIUM'
  //   }
  // });
  // console.log(foundLogs);

  Server.start();
}