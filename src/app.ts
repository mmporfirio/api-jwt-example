import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ENV } from './config';
import routes from './routes';
import http from 'http';

dotenv.config();

const createApp = (): Express => {
  const app = express();

  app
    .use(cors({ origin: '*' }))
    .use(express.json())
    .use(routes);

  return app;
};

export const app = createApp();

if (process.env.NODE_ENV !== 'test') {
  const port = Number(ENV().PORT);
  const server = http.createServer(app);
  server.listen(port, () => {
    console.warn(`Server is running at http://localhost:${port}`);
  });
}
