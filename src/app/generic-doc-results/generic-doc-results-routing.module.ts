import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenericDocResultsPage } from './generic-doc-results.page';

const routes: Routes = [
  {
    path: '',
    component: GenericDocResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenericDocResultsPageRoutingModule {}
