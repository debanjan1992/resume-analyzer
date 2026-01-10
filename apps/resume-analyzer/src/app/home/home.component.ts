import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Hero } from "../components/hero/hero";
import { InputPanel } from "../components/input-panel/input-panel";

@Component({
  selector: 'app-home',
  imports: [Hero, InputPanel],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
