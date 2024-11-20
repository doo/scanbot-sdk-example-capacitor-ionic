import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    },
    {
        path: 'generic-document-result-fields/:documents',
        loadComponent: () =>
            import(
                './results/scan-result-fields/generic-document-result-fields/generic-document-result-fields.page'
            ).then((m) => m.GenericDocumentResultFieldsPage),
    },
    {
        path: 'generic-document-result-fields/:documents/:imageFileUri',
        loadComponent: () =>
            import(
                './results/scan-result-fields/generic-document-result-fields/generic-document-result-fields.page'
            ).then((m) => m.GenericDocumentResultFieldsPage),
    },
    {
        path: 'check-result-fields/:result',
        loadComponent: () =>
            import(
                './results/scan-result-fields/check-result-fields/check-result-fields.page'
            ).then((m) => m.CheckResultFieldsPage),
    },
    {
        path: 'medical-certificate-result-fields/:result',
        loadComponent: () =>
            import(
                './results/scan-result-fields/medical-certificate-result-fields/medical-certificate-result-fields.page'
            ).then((m) => m.MedicalCertificateResultFieldsPage),
    },
    {
        path: 'mrz-result-fields/:result',
        loadComponent: () => import('./results/scan-result-fields/mrz-result-fields/mrz-result-fields.page').then(m => m.MrzResultFieldsPage)
    },
    {
        path: 'ehic-result-fields/:result',
        loadComponent: () => import('./results/scan-result-fields/ehic-result-fields/ehic-result-fields.page').then(m => m.EHICResultFieldsPage)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
  {
    path: 'document-result',
    loadComponent: () => import('./results/document-result/document-result.page').then( m => m.DocumentResultPage)
  },
  {
    path: 'document-result/page-result',
    loadComponent: () => import('./results/page-result/page-result.page').then( m => m.PageResultPage)
  },
];
