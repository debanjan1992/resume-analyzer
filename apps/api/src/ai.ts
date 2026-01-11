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
  
SCORING RUBRIC (Strictly Follow These Definitions):

  1. "hardSkills" (0-20 pts):
     - 20 pts: Matches ALL top 5 technical skills/tools listed in JD (e.g., React, Node, AWS).
     - 15 pts: Matches most critical skills but misses 1-2 key tools.
     - 10 pts: Matches general stack but misses specific framework requirements.
     - <10 pts: Significant skill gaps or wrong tech stack.

  2. "experience" (0-20 pts):
     - 20 pts: Experience is highly relevant, uses strong power verbs (Led, Architected), and shows clear career progression.
     - 15 pts: Relevant roles but passive language ("Responsible for...").
     - <10 pts: Experience is vague, short tenure, or irrelevant to the target role.

  3. "metrics" (0-20 pts):
     - 20 pts: Resume is dense with impact data (e.g., "Improved latency by 20%", "Managed $50k budget").
     - 15 pts: Contains some numbers but they are generic (e.g., "Led a team of 5").
     - 0-5 pts: Purely descriptive with ZERO numbers or quantifiable results.

  4. "formatting" (0-10 pts):
     - 10 pts: Perfect readability. Clear headings, consistent dates, bullet points, no dense walls of text.
     - 5 pts: Readable but cluttered or inconsistent styling.
     - 0 pts: Hard to parse, bad structure, or typos detected.

  5. "education" (0-10 pts):
     - 10 pts: Degree matches the field (CS/Engineering) OR equivalent strong certification/experience is present.
     - 5 pts: Unrelated degree or missing details.

  6. "relevance" (0-20 pts):
     - 20 pts: The candidate is a "Perfect Fit" for THIS specific JD.
     - 10 pts: Good candidate but might be too junior/senior or pivoting from a different domain.
     - 0 pts: Completely irrelevant profile for this job.

  KEYWORD ANALYSIS RULES:
  1. "Matched": Keywords found in BOTH the Resume and JD.
  2. "High Priority Missing": Critical hard skills/tools mentioned in the JD's "Requirements" or "Qualifications" section that are MISSING from the resume.
  3. "Nice to Have": Skills mentioned in "Preferred Qualifications", "Bonus Skills", or "Pluses" that are MISSING.

  OUTPUT FORMAT:
  Return ONLY a raw JSON object with this exact schema:
  {
    "targetRole": "string", // Extract the exact Job Title from the JD (e.g. "Senior Frontend Engineer"). If not explicitly stated, infer it.
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
      "score": number (0-100), // Overall match percentage
      "matched": ["string"],        // Keywords found e.g. ["Angular", "React", "Node.js"]
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
