import PDFParser from "pdf2json";

export function extractTextFromPDF(pdfBuffer: Buffer): Promise<string> {
    
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(null, true);

    pdfParser.on('pdfParser_dataError', (errData: any) => {
      reject(errData.parserError);
    });

    pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
      const rawText = pdfParser.getRawTextContent();
      const cleanText = rawText.replace(/----------------Page \(\d+\) Break----------------/g, '').replace(/\r\n/g, '');
      resolve(cleanText);
    });

    pdfParser.parseBuffer(pdfBuffer);
  });

}