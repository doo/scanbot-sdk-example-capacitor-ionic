import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicensePlateScannerPage } from './license-plate-scanner.page';

const routes: Routes = [
  {
    path: '',
    component: LicensePlateScannerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicensePlateScannerPageRoutingModule {}
