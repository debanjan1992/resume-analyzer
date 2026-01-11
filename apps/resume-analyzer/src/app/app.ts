import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Hero } from './components/hero/hero';

@Component({
  imports: [RouterModule, Hero],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'resume-analyzer';
}
