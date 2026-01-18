import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Dashboard } from './dashboard/dashboard';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./landing-page/landing-page.component').then(
        (m) => m.LandingPageComponent,
      ),
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent,
      ),
    children: [
      { path: 'editor', component: HomeComponent },
      { path: 'analysis/:id', component: Dashboard },
      {
        path: 'history',
        loadComponent: () =>
          import('./history/history.component').then((m) => m.HistoryComponent),
      },
    ],
  },
];
