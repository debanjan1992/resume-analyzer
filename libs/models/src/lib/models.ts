export interface ResumeAnalysis {
  overallScore: number;
  powerVerbs: {
    count: number;
    list: string[];
  };
  quantifiableMetrics: {
    count: number;
    list: string[];
  };

  essentialSections: {
    missing: string[];
  };
  keywordMatch: {
    score: number;
    missingKeywords: string[];
  };
  criticalFixes: string[];
  recommendedImprovements: string[];
}

export interface ResumeAnalysisResponse {
  success: boolean;
  data: ResumeAnalysis;
}

export interface ResumeAnalysisRequest {
  resumeText: string;
  jobDescription: string;
}

export interface TextExtractionResponse {
  success: boolean;
  text: string;
}