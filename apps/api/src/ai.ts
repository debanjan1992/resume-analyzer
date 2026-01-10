
import { GoogleGenAI } from "@google/genai";
import { ResumeAnalysis } from "@resume-analyzer/models"

const ai = new GoogleGenAI({});

export async function getGeminiAnalysis(resumeText: string, jobDescription: string): Promise<ResumeAnalysis> {

  const prompt = `
    You are an expert ATS Resume Analyzer.
    
    RESUME TEXT:
    ${resumeText.substring(0, 10000)}

    JOB DESCRIPTION:
    ${jobDescription ? jobDescription.substring(0, 5000) : "General Software Engineering Role"}

    TASK:
    Analyze the resume against the job description. 
    Output a raw JSON object with this exact schema:
    {
      "overallScore": number (0-100),
      "powerVerbs": {
        "count": number,
        "list": ["string"]
      },
      "quantifiableMetrics": {
        "count": number,
        "list": ["string"]
      },
      "essentialSections": {
        "missing": ["string"]
      },
      "keywordMatch": {
        "score": number (0-100),
        "missingKeywords": ["string"]
      },
      "criticalFixes": ["string"],
      "recommendedImprovements": ["string"]
    }
  `;
  const result =await  ai.models.generateContent({ 
    model: "gemini-2.5-flash",
    config: { responseMimeType: "application/json"},
    contents: prompt
  });
  const text = result.text.trim();
  
  // Parse the string into a real Object
  return JSON.parse(text);
}