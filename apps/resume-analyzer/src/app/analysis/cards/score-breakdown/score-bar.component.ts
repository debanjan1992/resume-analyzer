import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { colorMap } from '../../../utils/utils';

@Component({
  selector: 'app-score-bar',
  template: `
    <div class="skill flex flex-col gap-1">
      <div class="metric flex items-center">
        <span class="flex-1 font-medium text-sm text-stone-600 font-semibold">{{
          label()
        }}</span>
        <span [ngClass]="colors().text" class="font-bold text-sm">{{ score() }} pts</span>
      </div>
      <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-1000 ease-out"
          [ngClass]="colors().bg"
          [style.width.%]="percentage()"
        ></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
})
export class ScoreBarComponent {
  score = input.required<number>();
  label = input.required<string>();
  color = input.required<'indigo' | 'red' | 'green' | 'amber'>();

  colors = computed(() => {
    const key = this.color();
    return colorMap[key] || colorMap['indigo'];
  });

  percentage = computed(() => (this.score() / 20) * 100);
}
