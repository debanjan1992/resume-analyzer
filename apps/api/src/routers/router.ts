import { Router } from 'express';
import { logger } from 'firebase-functions/v2';
import { analyzeResume, extractTextFromPDFHandler } from '../controllers/resume.controller';

export const router = Router();

router.get('/health', (req, res) => {
  res.json({
    message: 'Resume Analyzer API',
    status: 'ok',
  });
});

router.post('/extractText', extractTextFromPDFHandler);
router.post('/analyze', analyzeResume);
