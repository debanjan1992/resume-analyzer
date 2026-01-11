import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Dashboard } from './dashboard/dashboard';

export const appRoutes: Route[] = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'analysis', component: Dashboard, },
];
