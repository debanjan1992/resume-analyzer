import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ResumeAnalysisResponse,
  TextExtractionResponse,
} from '@resume-analyzer/models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  private http = inject(HttpClient);

  extractTextFromFile(file: File): Observable<TextExtractionResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<TextExtractionResponse>('/api/extractText', formData);
  }

  analyzeResume(
    resumeText: string,
    jobDescription: string,
    apiKey?: string,
  ): Observable<ResumeAnalysisResponse> {
    let url = '/api/analyze';
    if (apiKey) {
      url = url + '?apiKey=' + apiKey;
    }
    return this.http.post<ResumeAnalysisResponse>(url, {
      resumeText,
      jobDescription,
    });
  }
}
