import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { InputPanel } from '../components/input-panel/input-panel';
import { ResumeAnalysisStore } from '../resume.store';
import { AnalysisInProgress } from '../components/analysis-in-progress/analysis-in-progress';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [InputPanel, AnalysisInProgress],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  store = inject(ResumeAnalysisStore);
}
