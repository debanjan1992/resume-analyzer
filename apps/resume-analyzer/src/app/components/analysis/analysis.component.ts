import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ResumeAnalysisStore } from '../../resume.store';
import { ScoreCircle } from '../score-circle/score-circle';
import { StatCard } from './stat-card/stat-card';
import { AnalysisDetailsComponent } from './analysis-details/analysis-details.component';

@Component({
  selector: 'app-analysis',
  imports: [ScoreCircle, StatCard, AnalysisDetailsComponent],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysisComponent {
  store = inject(ResumeAnalysisStore);
}
