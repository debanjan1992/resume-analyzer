import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResumeAnalysisResponse, TextExtractionResponse } from '@resume-analyzer/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  private http = inject(HttpClient);

  extractTextFromFile(file: File): Observable<TextExtractionResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<TextExtractionResponse>(
      '/api/extractText',
      formData,
    );
  }

  analyzeResume(resumeText: string, jobDescription: string): Observable<ResumeAnalysisResponse> {
    return this.http.post<ResumeAnalysisResponse>('/api/analyze', {
      resumeText,
      jobDescription,
    });
  }
}
