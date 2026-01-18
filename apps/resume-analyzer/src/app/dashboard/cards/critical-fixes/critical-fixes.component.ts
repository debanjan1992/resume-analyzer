import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ResumeAnalysisStore } from '../../../resume.store';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-critical-fixes',
  imports: [TranslateModule],
  templateUrl: './critical-fixes.component.html',
  styleUrl: './critical-fixes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CriticalFixesComponent {
  store = inject(ResumeAnalysisStore);
}
