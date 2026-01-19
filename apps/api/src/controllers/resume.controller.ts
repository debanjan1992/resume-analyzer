import { Request, Response } from 'express';
import Busboy from 'busboy';
import { extractTextFromPDF } from '../helpers/extract-text-from-pdf';
import { getGeminiAnalysis } from '@resume-analyzer/shared';
import {
  ResumeAnalysisResponse,
  TextExtractionResponse,
} from '@resume-analyzer/models';
import { logger } from 'firebase-functions/logger';

interface FirebaseRequest extends Request {
  rawBody?: Buffer;
}

export const extractTextFromPDFHandler = (
  req: FirebaseRequest,
  res: Response<TextExtractionResponse | { error: string }>,
) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  const busboy = Busboy({ headers: req.headers });
  const fileBuffers: Buffer[] = [];

  busboy.on('file', (name, file, info) => {
    if (info.mimeType !== 'application/pdf') {
      file.resume();
      return;
    }
    file.on('data', (data) => fileBuffers.push(data));
  });

  busboy.on('finish', async () => {
    if (fileBuffers.length === 0) {
      return res.status(400).json({ error: 'No PDF uploaded.' });
    }

    const pdfBuffer = Buffer.concat(fileBuffers);

    try {
      const cleanText = await extractTextFromPDF(pdfBuffer);
      return res.json({
        success: true,
        text: cleanText,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to parse PDF.' });
    }
  });

  busboy.on('error', (error) => {
    logger.error(error);
    return res.status(500).json({ error: 'Failed to parse PDF.' });
  });

  if (req.rawBody) {
    busboy.end(req.rawBody);
  } else {
    req.pipe(busboy);
  }
};

export const analyzeResume = async (
  req: Request,
  res: Response<ResumeAnalysisResponse | { error: string }>,
) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  const apiKey = (req.query.apiKey as string) || process.env.GEMINI_API_KEY;
  logger.log('Gemini API Key', apiKey);
  if (!apiKey) {
    return res.status(401).json({ error: 'Gemini API Key is missing.' });
  }
  try {
    const { resumeText, jobDescription } = req.body;
    res.json({
      success: true,
      data: await getGeminiAnalysis(
        resumeText,
        jobDescription,
        req.query.apiKey as string,
      ),
    });
  } catch (error) {
    logger.error('Error analyzing resume with Gemini', error);
    return res.status(500).json({ error });
  }
};
