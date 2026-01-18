import { Component, inject, signal } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { Hero } from './components/hero/hero';
import { HeaderComponent } from './components/header/header.component';

@Component({
  imports: [RouterModule, Hero, HeaderComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly router = inject(Router);
  protected readonly showHeader = signal(false);

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((ev: NavigationEnd) => {
        this.showHeader.set(ev.url !== '/');
      });
  }
}
