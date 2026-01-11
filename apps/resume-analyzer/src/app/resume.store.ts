import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ResumeAnalysis } from '@resume-analyzer/models';
import { ResumeService } from './resume.service';
import { catchError, pipe, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

interface ResumeAnalysisState {
  analysisResult: ResumeAnalysis | null;
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
};

export const ResumeAnalysisStore = signalStore(
  withState(initialState),
  withMethods((store, resumeService = inject(ResumeService), router = inject(Router)) => {
    const setJobDescription = (jobDescription: string) => {
      patchState(store, { jobDescription });
    };

    const extractTextFromFile = rxMethod<File>(
      pipe(
        tap(() => patchState(store, { isTextExtracting: true })),
        switchMap((file) => resumeService.extractTextFromFile(file)),
        tap((response) => {
          patchState(store, { isTextExtracting: false });
          if (response.success) {
            patchState(store, { resumeText: response.text });
          }
        }),
        catchError((err) => {
          console.error('Error extracting text:', err);
          patchState(store, { isTextExtracting: false });
          return [];
        }),
      ),
    );

    const analyzeResume = rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isAnalyzing: true })),
        switchMap(() =>
          resumeService.analyzeResume(
            store.resumeText(),
            store.jobDescription(),
          ),
        ),
        tap((response) => {
          patchState(store, { isAnalyzing: false });
          if (response.success) {
            patchState(store, { analysisResult: response.data });
            router.navigate(['/analysis']);
          }
        }),
        catchError((err) => {
          console.error('Error analyzing resume:', err);
          patchState(store, { isAnalyzing: false });
          return [];
        }),
      ),
    );

    return {
      setJobDescription,
      extractTextFromFile,
      analyzeResume,
    };
  }),
  withComputed((store) => ({
    isLoading: computed(() => store.isAnalyzing() || store.isTextExtracting()),
  })),
);
