import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Hero } from "../components/hero/hero";
import { InputPanel } from "../components/input-panel/input-panel";
import { AnalysisComponent } from "../components/analysis/analysis.component";
import { ResumeAnalysisStore } from '../resume.store';
import { AnalysisInProgress } from '../components/analysis-in-progress/analysis-in-progress';
import { Dashboard } from "../dashboard/dashboard";

@Component({
  selector: 'app-home',
  imports: [Hero, InputPanel, AnalysisComponent, AnalysisInProgress, Dashboard],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  store = inject(ResumeAnalysisStore);
}
