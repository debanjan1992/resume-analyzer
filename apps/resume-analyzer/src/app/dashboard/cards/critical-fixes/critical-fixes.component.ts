import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ResumeAnalysisStore } from '../../../resume.store';

@Component({
  selector: 'app-critical-fixes',
  imports: [],
  templateUrl: './critical-fixes.component.html',
  styleUrl: './critical-fixes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CriticalFixesComponent {
  store = inject(ResumeAnalysisStore);
}
