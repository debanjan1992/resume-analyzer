import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header />
    <main class="w-full px-4 lg:w-4/7 mx-auto mt-12 overflow-auto mb-12">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class MainLayoutComponent {}
