import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'imageResults',
    loadComponent: () => import('./results/view-image-results/view-image-results.page').then(m => m.ViewImageResultsPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

