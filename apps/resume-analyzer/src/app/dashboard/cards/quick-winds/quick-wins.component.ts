import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ResumeAnalysisStore } from '../../../resume.store';
import { NgTemplateOutlet, NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-quick-wins',
  imports: [NgTemplateOutlet, NgClass, TranslateModule],
  templateUrl: './quick-wins.component.html',
  styleUrl: './quick-wins.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickWinsComponent {
  store = inject(ResumeAnalysisStore);
}
