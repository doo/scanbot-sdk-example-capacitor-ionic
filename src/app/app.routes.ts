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
    path: 'imageDetails/:pageId',
    loadComponent: () => import('./results/view-image-details/view-image-details.page').then(m => m.ViewImageDetailsPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
