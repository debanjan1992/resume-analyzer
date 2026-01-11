import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ResumeAnalysisStore } from '../../../resume.store';

@Component({
  selector: 'app-impact-language',
  imports: [],
  templateUrl: './impact-language.component.html',
  styleUrl: './impact-language.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImpactLanguageComponent {
  store = inject(ResumeAnalysisStore);
  activeView = signal<'strong' | 'weak'>('strong');

  setView(view: 'strong' | 'weak') {
    this.activeView.set(view);
  }
}
