import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ResumeAnalysisStore } from '../../resume.store';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-input-panel',
  imports: [ReactiveFormsModule, DecimalPipe, TranslateModule],
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
  });
  selectedFile = signal<File | null>(null);

  resumePlaceholder = signal('INPUT.RESUME.PLACEHOLDER');
  jobDescriptionPlaceholder = signal('INPUT.JOB_DESCRIPTION.PLACEHOLDER');

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
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.store.setJobDescription(value.targetJobDescription || '');
        this.store.setResumeText(value.resumeText || '');
      });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.store.analyzeResume(false);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    if (file) {
      this.selectedFile.set(file);
      this.extractTextFromFile();
    }
  }

  extractTextFromFile() {
    const file = this.selectedFile();
    if (!file) {
      return;
    }
    this.store.extractTextFromFile(file);
  }
}
