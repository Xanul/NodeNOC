# NOC Proyect

# dev
1. Change the file env.template to .env
2. Setup the enviroment variables
```
PORT =

MAILER_EMAIL=
MAILER_SECRET_KEY=

PROD=
```
3. Execute ```npm install```
4. Setup the databases with ```docker compose up -d```
5. Execute ```npx prisma migrate dev```
6. Execute ```npm run dev```