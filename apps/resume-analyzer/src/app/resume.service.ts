import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ResumeAnalysisResponse,
  TextExtractionResponse,
} from '@resume-analyzer/models';
import { catchError, from, map, Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { getGeminiAnalysis } from '@resume-analyzer/shared';
import { ToastService } from './services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  private http = inject(HttpClient);
  private toastService = inject(ToastService);

  extractTextFromFile(file: File): Observable<TextExtractionResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<TextExtractionResponse>(
      environment.apiUrl + '/extractText',
      formData,
    );
  }

  analyzeResume(
    resumeText: string,
    jobDescription: string,
    apiKey?: string,
    isDemo?: boolean,
  ): Observable<ResumeAnalysisResponse> {
    let url = environment.apiUrl + '/analyze';
    if (apiKey) {
      return from(getGeminiAnalysis(resumeText, jobDescription, apiKey)).pipe(
        map((data) => ({
          success: true,
          data,
        })),
        catchError((e) => {
          this.toastService.show(JSON.parse(e.message).error.message, 'error');
          return of({
            success: false,
            data: e,
          });
        }),
      );
    }
    if (isDemo) {
      url = '/demo-data.json';
    }
    return this.http.post<ResumeAnalysisResponse>(url, {
      resumeText,
      jobDescription,
    });
  }
}
