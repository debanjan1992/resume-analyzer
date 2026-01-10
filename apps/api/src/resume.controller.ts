import { Request, Response } from 'express';
import Busboy from 'busboy';
import PDFParser from 'pdf2json';

export const analyzeResume = (req: Request, res: Response) => {
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

  busboy.on('finish', () => {
    if (fileBuffers.length === 0) {
      return res.status(400).json({ error: 'No PDF uploaded.' });
    }

    const pdfBuffer = Buffer.concat(fileBuffers);

    const pdfParser = new PDFParser(null, true);

    pdfParser.on('pdfParser_dataError', (errData: any) => {
      console.error(errData.parserError);
      return res.status(500).json({ error: 'Failed to parse PDF.' });
    });

    pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
      const rawText = pdfParser.getRawTextContent();
      
      const cleanText = rawText.replace(/----------------Page \(\d+\) Break----------------/g, '').replace(/\r\n/g, '');

      return res.json({ 
        success: true, 
        text: cleanText 
      });
    });

    pdfParser.parseBuffer(pdfBuffer);
  });

  req.pipe(busboy);
};