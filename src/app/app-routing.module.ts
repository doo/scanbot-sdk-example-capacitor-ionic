import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'image-results', loadChildren: () => import('./image-results/image-results.module').then(m => m.ImageResultsPageModule) },
  { path: 'image-view/:pageId', loadChildren: () => import('./image-view/image-view.module').then(m => m.ImageViewPageModule) },
  { path: 'barcode-list', loadChildren: () => import('./barcode-list/barcode-list.module').then(m => m.BarcodeListModule) },
  { path: 'barcode-document-list', loadChildren: () => import('./barcode-document-list/barcode-document-list.module').then(m => m.BarcodeDocumentListModule) },
  { path: 'barcode-result-list', loadChildren: () => import('./barcode-result-list/barcode-result-list.module').then(m => m.BarcodeResultListPageModule) },
  { path: 'html5-camera', loadChildren: () => import('./html5-camera/html5-camera.module').then(m => m.Html5CameraPageModule) },
  { path: 'idcard-scan-results', loadChildren: () => import('./idcard-scan-results/idcard-scan-results.module').then(m => m.IdCardScanResultsPageModule) },
  { path: 'check-recognizer-results', loadChildren: () => import('./check-recognizer-results/check-recognizer-results.module').then(m => m.CheckRecognizerResultsPageModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
