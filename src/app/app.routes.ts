import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    },
    {
        path: 'image-results',
        loadComponent: () =>
            import('./results/image-results/image-results.page').then(
                (m) => m.ImageResultsPage,
            ),
    },
    {
        path: 'image-details/:pageId',
        loadComponent: () =>
            import('./results/image-details/image-details.page').then(
                (m) => m.ImageDetailsPage,
            ),
    },
    {
        path: 'generic-document-result-fields/:result',
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
        path: 'barcode-formats',
        loadComponent: () =>
            import('./settings/barcode-formats/barcode-formats.page').then(
                (m) => m.BarcodeFormatsPage,
            ),
    },
    {
        path: 'barcode-document-formats',
        loadComponent: () =>
            import(
                './settings/barcode-document-formats/barcode-document-formats.page'
            ).then((m) => m.BarcodeDocumentFormatsPage),
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
  {
    path: 'mrz-result-fields/:result',
    loadComponent: () => import('./results/scan-result-fields/mrz-result-fields/mrz-result-fields.page').then(m => m.MrzResultFieldsPage)
  },
];
