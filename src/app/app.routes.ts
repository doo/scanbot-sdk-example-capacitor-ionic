import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'document-data-extractor-result/:status/:document/:image',
    loadComponent: () =>
      import('./results/scan-results/document-data-extractor-result.page').then(
        (m) => m.DocumentDataExtractorResultPage,
      ),
  },
  {
    path: 'document-data-extractor-result/:status/:document',
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
    path: 'mrz-result/:rawMRZ/:mrzDocument',
    loadComponent: () =>
      import('./results/scan-results/mrz-result.page').then((m) => m.MrzResultPage),
  },
  {
    path: 'check-result/:status/:check/:imageRefId',
    loadComponent: () =>
      import('./results/scan-results/check-result.page').then((m) => m.CheckResultPage),
  },
  {
    path: 'check-result/:status/:check',
    loadComponent: () =>
      import('./results/scan-results/check-result.page').then((m) => m.CheckResultPage),
  },
  {
    path: 'document-result/:documentUuid',
    loadComponent: () =>
      import('./results/document-result/document-result.page').then((m) => m.DocumentResultPage),
  },
  {
    path: 'page-result/:documentUuid/:pageUuid',
    loadComponent: () =>
      import('./results/page-result/page-result.page').then((m) => m.PageResultPage),
  },
  {
    path: 'image-result/:encodedImageBuffer',
    loadComponent: () =>
      import('./results/image-result/image-result.page').then((m) => m.ImageResultPage),
  },
  {
    path: 'document-custom-ui',
    loadComponent: () =>
      import('./document-custom-ui/document-custom-ui.page').then((m) => m.DocumentCustomUiPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
