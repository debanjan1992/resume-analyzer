import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ResumeAnalysis } from '@resume-analyzer/models';
import { ResumeService } from './resume.service';
import { pipe, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { tapResponse } from '@ngrx/operators';

interface ResumeAnalysisState {
  analysisResult: ResumeAnalysis | null;
  apiKey: string;
  isAnalyzing: boolean;
  isTextExtracting: boolean;
  jobDescription: string;
  resumeText: string;
  currentId: string | null;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  resumeText: string;
  jobDescription: string;
  analysisResult: ResumeAnalysis;
}

const initialState: ResumeAnalysisState = {
  analysisResult: null,
  isAnalyzing: false,
  isTextExtracting: false,
  jobDescription: '',
  resumeText: '',
  apiKey: localStorage.getItem('gemini-api-key') || '',
  currentId: null,
};

export const ResumeAnalysisStore = signalStore(
  withState(initialState),
  withMethods(
    (store, resumeService = inject(ResumeService), router = inject(Router)) => {
      const setJobDescription = (jobDescription: string) => {
        patchState(store, { jobDescription });
      };
      const setResumeText = (resumeText: string) => {
        patchState(store, { resumeText });
      };

      const setAPIKey = (apiKey: string) => {
        localStorage.setItem('gemini-api-key', apiKey);
        patchState(store, { apiKey });
      };

      const saveToHistory = (
        resumeText: string,
        jobDescription: string,
        analysisResult: ResumeAnalysis,
      ): string => {
        const id = crypto.randomUUID();
        const historyItem: HistoryEntry = {
          id,
          timestamp: Date.now(),
          resumeText,
          jobDescription,
          analysisResult,
        };
        const history = JSON.parse(
          localStorage.getItem('resume-analysis-history') || '[]',
        );
        history.unshift(historyItem);
        localStorage.setItem(
          'resume-analysis-history',
          JSON.stringify(history),
        );
        return id;
      };

      const extractTextFromFile = rxMethod<File>(
        pipe(
          tap(() => patchState(store, { isTextExtracting: true })),
          switchMap((file) =>
            resumeService.extractTextFromFile(file).pipe(
              tapResponse({
                next: (response) => {
                  patchState(store, { isTextExtracting: false });
                  if (response.success) {
                    patchState(store, { resumeText: response.text });
                  }
                },
                error: (error) => {
                  patchState(store, { isTextExtracting: false });
                  console.error(error);
                },
                finalize: () => {
                  patchState(store, { isTextExtracting: false });
                },
              }),
            ),
          ),
        ),
      );

      const analyzeResume = rxMethod<boolean>(
        pipe(
          tap(() => patchState(store, { isAnalyzing: true })),
          switchMap((demo) =>
            resumeService
              .analyzeResume(
                store.resumeText(),
                store.jobDescription(),
                store.apiKey(),
                demo,
              )
              .pipe(
                tapResponse({
                  next: (response) => {
                    if (response.success) {
                      patchState(store, { analysisResult: response.data });
                      const id = saveToHistory(
                        store.resumeText(),
                        store.jobDescription(),
                        response.data,
                      );
                      patchState(store, { currentId: id });
                      router.navigate(['/analysis', id]);
                    }
                  },
                  error: (error) => {
                    patchState(store, { isAnalyzing: false });
                    console.error(error);
                  },
                  finalize: () => {
                    patchState(store, { isAnalyzing: false });
                  },
                }),
              ),
          ),
        ),
      );

      const loadAnalysisById = (id: string) => {
        const history: HistoryEntry[] = JSON.parse(
          localStorage.getItem('resume-analysis-history') || '[]',
        );
        const entry = history.find((item) => item.id === id);

        if (entry) {
          patchState(store, {
            resumeText: entry.resumeText,
            jobDescription: entry.jobDescription,
            analysisResult: entry.analysisResult,
            currentId: entry.id,
          });
        }
      };

      const loadHistoryEntry = (entry: HistoryEntry) => {
        // Redundant now, but keeping for backward compatibility if needed temporarily
        router.navigate(['/analysis', entry.id]);
      };

      return {
        setJobDescription,
        setResumeText,
        setAPIKey,
        extractTextFromFile,
        analyzeResume,
        loadHistoryEntry,
        loadAnalysisById,
      };
    },
  ),
  withComputed((store) => ({
    isLoading: computed(() => store.isAnalyzing() || store.isTextExtracting()),
  })),
);
