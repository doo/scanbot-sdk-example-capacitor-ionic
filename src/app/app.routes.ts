import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    },
    {
        path: 'page-results',
        loadComponent: () =>
            import('./results/page-results/page-results.page').then(
                (m) => m.PageResultsPage,
            ),
    },
    {
        path: 'page-details/:pageId',
        loadComponent: () =>
            import('./results/page-details/page-details.page').then(
                (m) => m.PageDetailsPage,
            ),
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
        path: 'mrz-result-fields/:result',
        loadComponent: () => import('./results/scan-result-fields/mrz-result-fields/mrz-result-fields.page').then(m => m.MrzResultFieldsPage)
    },
    {
        path: 'document-detection-fields/:result',
        loadComponent: () => import('./results/scan-result-fields/document-detection-fields/document-detection-fields.page').then(m => m.DocumentDetectionFieldsPage)
    },
    {
        path: 'ehic-result-fields/:result',
        loadComponent: () => import('./results/scan-result-fields/ehic-result-fields/ehic-result-fields.page').then(m => m.EHICResultFieldsPage)
    },
    {
        path: 'barcode-result-fields/:result',
        loadComponent: () => import('./results/scan-result-fields/barcode-result-fields/barcode-result-fields.page').then(m => m.BarcodeResultFieldsPage)
    },
    {
        path: 'legacy-barcode-result-fields/:result',
        loadComponent: () => import('./results/scan-result-fields/legacy-barcode-result-fields/legacy-barcode-result-fields.page').then(m => m.LegacyBarcodeResultFieldsPage)
    },
    {
        path: 'image-results/:imageFileUris',
        loadComponent: () => import('./results/image-results/image-results.page').then((m) => m.ImageResultsPage),
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
];
