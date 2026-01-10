import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-score-circle',
  imports: [NgClass],
  templateUrl: './score-circle.html',
  styleUrl: './score-circle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreCircle {
  score = input.required<number>(); 
  readonly radius = 120;
  readonly circumference = 2 * Math.PI * this.radius;

  dashOffset = computed(() => {
    const progress = this.score() / 100;
    return this.circumference * (1 - progress);
  });

  colorClass = computed(() => {
    const s = this.score();
    if (s >= 80) return 'text-green-500';
    if (s >= 60) return 'text-amber-500';
    return 'text-red-500';
  });

  labelText = computed(() => {
    const s = this.score();
    if (s >= 80) return 'Excellent';
    if (s >= 60) return 'Good Start';
    if (s >= 40) return 'Needs Improvement';
    return 'Poor';
  });
}
