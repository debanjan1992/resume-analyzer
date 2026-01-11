import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ScoreCircle } from '../../../components/score-circle/score-circle';
import { ResumeAnalysisStore } from '../../../resume.store';

@Component({
  selector: 'app-ats-score',
  imports: [ScoreCircle],
  templateUrl: './ats-score.component.html',
  styleUrl: './ats-score.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtsScoreComponent {
  store = inject(ResumeAnalysisStore);
}
