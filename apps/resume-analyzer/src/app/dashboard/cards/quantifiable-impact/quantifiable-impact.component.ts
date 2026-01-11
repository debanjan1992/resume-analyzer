import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ResumeAnalysisStore } from '../../../resume.store';

@Component({
  selector: 'app-quantifiable-impact',
  imports: [],
  templateUrl: './quantifiable-impact.component.html',
  styleUrl: './quantifiable-impact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuantifiableImpactComponent {
  store = inject(ResumeAnalysisStore);
}
