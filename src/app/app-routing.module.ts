import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ImagePreviewComponent } from './image-preview/image-preview.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mainpage',
    pathMatch: 'full'
  },
  {
    path: 'mainpage',
    loadChildren: () => import('./mainpage/mainpage.module').then( m => m.MainpagePageModule)
  },
  {
    path: 'document-results',
    loadChildren: () => import('./document-results/document-results.module').then( m => m.DocumentResultsPageModule)
  },
  {
    path: 'barcode-results',
    loadChildren: () => import('./barcode-results/barcode-results.module').then( m => m.BarcodeResultsPageModule)
  },
  {
    path: 'generic-doc-results',
    loadChildren: () => import('./generic-doc-results/generic-doc-results.module').then( m => m.GenericDocResultsPageModule)
  },
  {
    path: 'ehci-results',
    loadChildren: () => import('./ehci-results/ehci-results.module').then( m => m.EhciResultsPageModule)
  },
  {
    path: 'license-plate-scanner',
    loadChildren: () => import('./license-plate-scanner/license-plate-scanner.module').then( m => m.LicensePlateScannerPageModule)
  },
  {
    path: 'medical-certificate-scanner',
    loadChildren: () => import('./medical-certificate-scanner/medical-certificate-scanner.module').then( m => m.MedicalCertificateScannerPageModule)
  },
  {
    path: 'mrz-scanner',
    loadChildren: () => import('./mrz-scanner/mrz-scanner.module').then( m => m.MrzScannerPageModule)
  },
  {
    path: 'text-data-scanner',
    loadChildren: () => import('./text-data-scanner/text-data-scanner.module').then( m => m.TextDataScannerPageModule)
  },
  {
    path: 'check-results',
    loadChildren: () => import('./check-results/check-results.module').then( m => m.CheckResultsPageModule)
  },
  { path: 'image-preview/:imageFileUri', component: ImagePreviewComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
