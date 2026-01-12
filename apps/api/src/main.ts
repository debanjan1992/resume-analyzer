import express from 'express';
import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2';
import cors from 'cors';
import 'firebase-admin';
import { router } from './routers/router';

setGlobalOptions({ maxInstances: 1 });

const app = express();
app.use(
  cors({
    origin: [
      'http://localhost:4200',
      'https://smartresumeanalyzer.debanjansaha.in',
    ],
  }),
);
app.use('/', router);

export const api = onRequest(app);
