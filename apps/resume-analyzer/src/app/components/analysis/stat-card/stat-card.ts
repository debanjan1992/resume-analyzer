import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  imports: [NgClass],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCard {
  icon = input.required<string>();
  iconColorClass = input.required<string>();
  iconBackgroundColorClass = input.required<string>();
  label = input.required<string>();
  value = input.required<string | number>();
  subLabel = input.required<string>();
}
