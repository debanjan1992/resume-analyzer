import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ResumeService } from '../../resume.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ResumeAnalysis, ResumeAnalysisRequest } from '@resume-analyzer/models';
import { ResumeAnalysisStore } from '../../resume.store';

@Component({
  selector: 'app-input-panel',
  imports: [ReactiveFormsModule, DecimalPipe],
  templateUrl: './input-panel.html',
  styleUrl: './input-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPanel implements OnInit {
  destroyRef = inject(DestroyRef);
  store = inject(ResumeAnalysisStore);
  fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    resumeText: ['', Validators.required],
    targetJobDescription: ['', Validators.required],
    apiKey: ['']
  });
  selectedFile = signal<File | null>(null);

  resumePlaceholder = signal(
    `Resume content will appear here after upload, or you can paste it directly.`,
  );
  jobDescriptionPlaceholder =
    signal(`Paste the target job description you are applying for here...
    
    Requirements:
    - 5+ years experience in React
    - Excellent problem-solving skills
    - Strong communication and teamwork abilities
    `);

  get resumeTextControl() {
    return this.form.get('resumeText');
  }

  get targetJobDescriptionControl() {
    return this.form.get('targetJobDescription');
  }

  constructor() {
    effect(() => {
      this.resumeTextControl?.setValue(this.store.resumeText());
    });
  }

  ngOnInit() {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      this.store.setJobDescription(value.targetJobDescription || '');
      this.store.setResumeText(value.resumeText || '');
      this.store.setAPIKey(value.apiKey || '');
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.store.analyzeResume(false);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile.set(file);
      this.extractTextFromFile()
    }
  }

  extractTextFromFile() {
    if (this.selectedFile() == null) {
      return;
    }
    this.store.extractTextFromFile(this.selectedFile()!);
  }
}
