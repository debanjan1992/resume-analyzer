import { GoogleGenAI } from '@google/genai';
import { ResumeAnalysis } from '@resume-analyzer/models';

const ai = new GoogleGenAI({});

export async function getGeminiAnalysis(
  resumeText: string,
  jobDescription: string,
): Promise<ResumeAnalysis> {
  const prompt = `
  You are an expert Technical Recruiter and ATS (Applicant Tracking System) Analyzer.
  
  RESUME TEXT:
  "${resumeText.substring(0, 15000)}" 

  JOB DESCRIPTION (JD):
  "${jobDescription ? jobDescription.substring(0, 5000) : 'General Software Engineering Role'}"

  TASK:
  Analyze the resume deeply against the JD. Be critical but constructive.
  
  SCORING ALGORITHM (STRICT):
  - Base Score: 0
  - +20 pts for matching top 5 hard skills from JD.
  - +20 pts for clear Experience section with power verbs.
  - +20 pts for quantifiable metrics (numbers, $, %).
  - +10 pts for Education/Certifications relevance.
  - +10 pts for Formatting/Readability (inferred from text structure).
  - +20 pts for overall relevance to the specific role.
  - Cap at 100. Deduct 5 pts for every critical section missing.

  OUTPUT FORMAT:
  Return ONLY a raw JSON object with this exact schema:
  {
    "overallScore": number (0-100),
    
    // NEW: Breakdown of why the score is what it is
    "scoreBreakdown": {
      "hardSkills": number (0-20),
      "experience": number (0-20),
      "metrics": number (0-20),
      "formatting": number (0-10),
      "education": number (0-10),
      "relevance": number (0-20)
    },

    "powerVerbs": {
      "count": number,
      "score": number (0-10), // Rate the strength of verbs used
      "list": ["string"],     // Top 5 strong verbs found
      "weakVerbs": ["string"] // List verbs that should be replaced (e.g. "Helped", "Worked on")
    },

    "quantifiableMetrics": {
      "count": number,
      "list": ["string"],     // Extract the sentences containing the metrics
      "suggestion": "string"  // A specific tip if count is low (e.g. "Add metrics to your Project X")
    },

    "essentialSections": {
      "missing": ["string"],  // e.g. ["Summary", "Projects"]
      "detected": ["string"]  // e.g. ["Experience", "Education", "Skills"]
    },

    // NEW: Soft Skills Analysis (Implicit)
    "softSkills": {
      "detected": ["string"], // e.g. ["Leadership", "Communication", "Agile"]
      "missing": ["string"]   // Soft skills mentioned in JD but missing in Resume
    },

    "keywordMatch": {
      "score": number (0-100),
      "matched": ["string"],        // Keywords found
      "missingHighPriority": ["string"], // Critical technical skills missing
      "missingLowPriority": ["string"]   // Nice-to-have skills missing
    },

    // NEW: Formatting & Tone Checks
    "formattingCheck": {
      "isBulletPointsUsed": boolean,
      "isChronological": boolean,    // Detect if dates look reverse-chronological
      "tone": "string",              // e.g. "Professional", "Passive", "Too Casual"
      "issues": ["string"]           // e.g. "Paragraphs too long", "Inconsistent dates"
    },

    "criticalFixes": ["string"],       // Urgent blockers (e.g. "Missing Contact Info")
    "recommendedImprovements": ["string"] // Polish (e.g. "Change 'Helped' to 'Led'")
  }
`;
  const result = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    config: { responseMimeType: 'application/json', temperature: 0, topP: 1 },
    contents: prompt,
  });
  const text = result.text.trim();

  // Parse the string into a real Object
  return JSON.parse(text);
}
