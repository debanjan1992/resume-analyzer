import { Request, Response } from 'express';
import Busboy from 'busboy';
import { extractTextFromPDF } from './extract-text-from-pdf';
import { getGeminiAnalysis } from './ai';
import {
  ResumeAnalysisRequest,
  ResumeAnalysisResponse,
  TextExtractionResponse,
} from '@resume-analyzer/models';

export const extractTextFromPDFHandler = (
  req: Request,
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
      console.error(error);
      return res.status(500).json({ error: 'Failed to parse PDF.' });
    }
  });

  req.pipe(busboy);
};

export const analyzeResume = async (
  req: Request,
  res: Response<ResumeAnalysisResponse>,
) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  const { resumeText, jobDescription } = req.body as ResumeAnalysisRequest;

  res.json({
    success: true,
    data: await getGeminiAnalysis(resumeText, jobDescription),
  });
};
