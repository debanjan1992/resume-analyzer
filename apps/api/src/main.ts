import express from 'express';
import * as path from 'path';
import { onRequest } from 'firebase-functions/v2/https';
import { analyzeResume, extractTextFromPDFHandler } from './resume.controller';

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use(express.urlencoded({ extended: true }));

app.post('/extractText', (req, res) => {
  extractTextFromPDFHandler(req, res);
});

app.post('/analyze', (req, res) => {
  try {
    analyzeResume(req, res);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

if (process.env.NX_CLI_SET) {
  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
}

export const api = onRequest(app);
