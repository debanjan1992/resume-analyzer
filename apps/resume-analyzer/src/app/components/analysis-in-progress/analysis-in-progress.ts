import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-analysis-in-progress',
  imports: [],
  templateUrl: './analysis-in-progress.html',
  styleUrl: './analysis-in-progress.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysisInProgress {
  messages = [
    'Parsing PDF content...',
    'Extracting keywords...',
    'Analyzing against Job Description...',
    'Generating suggestions...',
  ];
  currentMessage = signal(this.messages[0]);

  private intervalId: any;

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
    }, 5000);
  }
}
