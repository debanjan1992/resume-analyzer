import {
  ChangeDetectionStrategy,
  Component,
  signal,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-analysis-in-progress',
  imports: [TranslateModule],
  templateUrl: './analysis-in-progress.html',
  styleUrl: './analysis-in-progress.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysisInProgress implements OnInit, OnDestroy {
  messages = [
    'ANALYSIS.MESSAGES.PARSING',
    'ANALYSIS.MESSAGES.EXTRACTING',
    'ANALYSIS.MESSAGES.ANALYZING',
    'ANALYSIS.MESSAGES.GENERATING',
    'ANALYSIS.MESSAGES.CATEGORIZING',
    'ANALYSIS.MESSAGES.EXPERIENCE',
    'ANALYSIS.MESSAGES.OPTIMIZING',
    'ANALYSIS.MESSAGES.REVIEWING',
    'ANALYSIS.MESSAGES.COMPILING',
  ];
  currentMessage = signal(this.messages[0]);

  private intervalId: ReturnType<typeof setInterval> | undefined;

  ngOnInit() {
    this.startMessageCycle();
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  startMessageCycle() {
    let index = 0;
    this.intervalId = setInterval(() => {
      index = (index + 1) % this.messages.length;
      this.currentMessage.set(this.messages[index]);
    }, 3000);
  }
}
