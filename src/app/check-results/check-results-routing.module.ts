import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckResultsPage } from './check-results.page';

const routes: Routes = [
  {
    path: '',
    component: CheckResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckResultsPageRoutingModule {}
