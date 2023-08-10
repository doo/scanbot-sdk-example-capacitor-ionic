import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalCertificateScannerPage } from './medical-certificate-scanner.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalCertificateScannerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalCertificateScannerPageRoutingModule {}
