import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextDataScannerPage } from './text-data-scanner.page';

const routes: Routes = [
  {
    path: '',
    component: TextDataScannerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextDataScannerPageRoutingModule {}
