import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ResumeAnalysisStore } from '../../../resume.store';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-soft-skills',
  imports: [TranslateModule],
  templateUrl: './soft-skills.component.html',
  styleUrl: './soft-skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoftSkillsComponent {
  store = inject(ResumeAnalysisStore);
}
