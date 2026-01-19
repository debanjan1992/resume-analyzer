import { GoogleGenAI } from '@google/genai';
import { ResumeAnalysis } from '@resume-analyzer/models';
import { getPrompt } from './prompt';

export async function getGeminiAnalysis(
  resumeText: string,
  jobDescription: string,
  apiKey?: string,
): Promise<ResumeAnalysis> {
  const googleApiToken = apiKey ? apiKey : process.env['GEMINI_API_KEY'];

  const ai = new GoogleGenAI({
    apiKey: googleApiToken,
  });
  const prompt = getPrompt(resumeText, jobDescription);
  const result = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    config: { responseMimeType: 'application/json', temperature: 0, topP: 1 },
    contents: prompt,
  });
  const text = result.text!.trim();

  return JSON.parse(text);
}
