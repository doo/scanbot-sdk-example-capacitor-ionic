import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'imageResults',
    //remove view from name
    loadComponent: () => import('./results/view-image-results/view-image-results.page').then(m => m.ViewImageResultsPage)
  },
  {
    path: 'imageDetails/:pageId',
    //remove view from name
    loadComponent: () => import('./results/view-image-details/view-image-details.page').then(m => m.ViewImageDetailsPage)
  },
  {
    path: 'genericDocumentResult/:result',
    loadComponent: () => import('./results/scan-result-fields/generic-document-result-fields/generic-document-result-fields.page').then(m => m.GenericDocumentResultFieldsPage)
  },
  {
    path: 'checkResult/:result',
    loadComponent: () => import('./results/scan-result-fields/check-result-fields/check-result-fields.page').then(m => m.CheckResultFieldsPage)
  },
  {
    path: 'medicalCertificateResult/:result',
    loadComponent: () => import('./results/scan-result-fields/medical-certificate-result-fields/medical-certificate-result-fields.page').then(m => m.MedicalCertificateResultFieldsPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
