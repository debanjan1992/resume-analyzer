import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ResumeAnalysisStore } from '../../../resume.store';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-quantifiable-impact',
  imports: [TranslateModule],
  templateUrl: './quantifiable-impact.component.html',
  styleUrl: './quantifiable-impact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuantifiableImpactComponent {
  store = inject(ResumeAnalysisStore);
}
