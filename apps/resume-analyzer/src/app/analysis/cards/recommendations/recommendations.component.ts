import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ResumeAnalysisStore } from '../../../resume.store';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-recommendations',
  imports: [TranslateModule],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationsComponent {
  store = inject(ResumeAnalysisStore);
}
