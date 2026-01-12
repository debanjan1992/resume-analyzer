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
}

const initialState: ResumeAnalysisState = {
  analysisResult: null,
  isAnalyzing: false,
  isTextExtracting: false,
  jobDescription: '',
  resumeText: '',
  apiKey: '',
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
        patchState(store, { apiKey });
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

      const analyzeResume = rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isAnalyzing: true })),
          switchMap(() =>
            resumeService
              .analyzeResume(
                store.resumeText(),
                store.jobDescription(),
                store.apiKey(),
              )
              .pipe(
                tapResponse({
                  next: (response) => {
                    if (response.success) {
                      patchState(store, { analysisResult: response.data });
                      router.navigate(['/analysis']);
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

      return {
        setJobDescription,
        setResumeText,
        setAPIKey,
        extractTextFromFile,
        analyzeResume,
      };
    },
  ),
  withComputed((store) => ({
    isLoading: computed(() => store.isAnalyzing() || store.isTextExtracting()),
  })),
);
