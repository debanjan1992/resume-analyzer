import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ResumeAnalysisStore } from '../../../resume.store';
import { ScoreBarComponent } from './score-bar.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-score-breakdown',
  imports: [ScoreBarComponent, TranslateModule],
  templateUrl: './score-breakdown.component.html',
  styleUrl: './score-breakdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreBreakdownComponent {
  store = inject(ResumeAnalysisStore);
}
