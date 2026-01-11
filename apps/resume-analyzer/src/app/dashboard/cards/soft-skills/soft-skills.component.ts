import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ResumeAnalysisStore } from '../../../resume.store';

@Component({
  selector: 'app-soft-skills',
  imports: [],
  templateUrl: './soft-skills.component.html',
  styleUrl: './soft-skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoftSkillsComponent {
  store = inject(ResumeAnalysisStore);
}
