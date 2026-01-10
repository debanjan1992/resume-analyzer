export interface ResumeAnalysis {
  overallScore: number;
  scoreBreakdown: {
    hardSkills: number;
    experience: number;
    metrics: number;
    formatting: number;
    education: number;
    relevance: number;
  };
  powerVerbs: {
    count: number;
    score: number;
    list: string[];
    weakVerbs: string[];
  };
  quantifiableMetrics: {
    count: number;
    list: string[];
    suggestion: string;
  };
  essentialSections: {
    missing: string[];
    detected: string[];
  };
  softSkills: {
    detected: string[];
    missing: string[];
  };
  keywordMatch: {
    score: number;
    matched: string[];
    missingHighPriority: string[];
    missingLowPriority: string[];
  };
  formattingCheck: {
    isBulletPointsUsed: boolean;
    isChronological: boolean;
    tone: string;
    issues: string[];
  };
  criticalFixes: string[];
  recommendedImprovements: string[];
}

export interface ResumeAnalysisRequest {
  resumeText: string;
  jobDescription: string;
}

export interface ResumeAnalysisResponse {
  success: boolean;
  data: ResumeAnalysis;
}

export interface TextExtractionResponse {
  success: boolean;
  text: string;
}
