import { Component, inject, signal } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';

@Component({
  imports: [RouterModule, HeaderComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  protected readonly showHeader = signal(false);

  constructor() {
    this.translate.setDefaultLang('en-US');
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((ev: NavigationEnd) => {
        this.showHeader.set(ev.url !== '/');
      });
  }
}
