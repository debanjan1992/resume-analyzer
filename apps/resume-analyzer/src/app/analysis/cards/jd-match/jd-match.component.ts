import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ResumeAnalysisStore } from '../../../resume.store';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-jd-match',
  imports: [TranslateModule],
  templateUrl: './jd-match.component.html',
  styleUrl: './jd-match.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JdMatchComponent {
  store = inject(ResumeAnalysisStore);
}
