import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ResumeAnalysisStore } from '../../../resume.store';

@Component({
  selector: 'app-structure-check',
  imports: [],
  templateUrl: './structure-check.component.html',
  styleUrl: './structure-check.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StructureCheckComponent {
  store = inject(ResumeAnalysisStore);
}
