import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-panel',
  imports: [ReactiveFormsModule],
  templateUrl: './input-panel.html',
  styleUrl: './input-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPanel {
  fb = inject(NonNullableFormBuilder);
  form = this.fb.group({
    resumeText: ['', Validators.required],
    targetJobDescription: ['', Validators.required],
  });

  resumePlaceholder = signal(`Resume content will appear here after upload, or you can paste it directly.`);
  jobDescriptionPlaceholder = signal(`Paste the target job description you are applying for here...
    
    Requirements:
    - 5+ years experience in React
    - Strong knowledge of TypeScript
    - Experience with RESTful APIs
    - Excellent problem-solving skills
    - Strong communication and teamwork abilities
    `);

  get resumeTextControl() {
    return this.form.get('resumeText');
  }

  get targetJobDescriptionControl() {
    return this.form.get('targetJobDescription');
  }

  submit() {
    console.log(this.form.value);
  }
}
