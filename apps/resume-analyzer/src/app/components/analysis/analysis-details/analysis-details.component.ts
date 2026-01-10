import { NgTemplateOutlet, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ResumeAnalysisStore } from '../../../resume.store';

type Tab = 'fixes' | 'keywords' | 'parsed';

@Component({
  selector: 'app-analysis-details',
  imports: [NgTemplateOutlet],
  templateUrl: './analysis-details.component.html',
  styleUrl: './analysis-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysisDetailsComponent {
  store = inject(ResumeAnalysisStore);

  activeTab = signal<Tab>('fixes');

  setActiveTab(tab: Tab) {
    this.activeTab.set(tab);
  }
}
