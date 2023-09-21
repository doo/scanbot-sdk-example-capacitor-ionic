import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarcodeResultsPage } from './barcode-results.page';

const routes: Routes = [
  {
    path: '',
    component: BarcodeResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarcodeResultsPageRoutingModule {}
