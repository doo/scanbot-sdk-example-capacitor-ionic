import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EhciResultsPage } from './ehci-results.page';

const routes: Routes = [
  {
    path: '',
    component: EhciResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EhciResultsPageRoutingModule {}
