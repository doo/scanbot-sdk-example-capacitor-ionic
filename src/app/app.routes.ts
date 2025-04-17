import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'document-data-extractor-result/:documents',
    loadComponent: () =>
      import('./results/scan-results/document-data-extractor-result.page').then(
        (m) => m.DocumentDataExtractorResultPage,
      ),
  },
  {
    path: 'credit-card-result/:status/:creditCard',
    loadComponent: () =>
      import('./results/scan-results/credit-card-result.page').then((m) => m.CreditCardResultPage),
  },
  {
    path: 'health-insurance-card-result-fields/:fields',
    loadComponent: () =>
      import('./results/scan-results/health-insurance-card-result-fields.page').then(
        (m) => m.EhicResultFieldsPage,
      ),
  },
  {
    path: 'medical-certificate-result/:medicalCert',
    loadComponent: () =>
      import('./results/scan-results/medical-certificate-result.page').then(
        (m) => m.MedicalCertificateResultPage,
      ),
  },
  {
    path: 'mrz-result/:rawMRZ/:mrzDocument',
    loadComponent: () =>
      import('./results/scan-results/mrz-result.page').then((m) => m.MrzResultPage),
  },
  {
    path: 'check-result/:checkResult',
    loadComponent: () =>
      import('./results/scan-results/check-result.page').then((m) => m.CheckResultPage),
  },
  {
    path: 'document-result/:documentID',
    loadComponent: () =>
      import('./results/document-result/document-result.page').then((m) => m.DocumentResultPage),
  },
  {
    path: 'page-result/:documentID/:pageID',
    loadComponent: () =>
      import('./results/page-result/page-result.page').then((m) => m.PageResultPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
