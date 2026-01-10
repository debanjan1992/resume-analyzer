import express from 'express';
import * as path from 'path';
import { onRequest } from 'firebase-functions/v2/https'; // If using Firebase
import { analyzeResume } from './resume.controller';

const app = express();

app.use(express.json()); // Important for parsing JSON bodies
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to the Resume Analyzer API!' });
});

app.post('/api/analyze', (req, res) => {
  analyzeResume(req, res);
});

if (process.env.NX_CLI_SET) {
  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
}

export const api = onRequest(app);