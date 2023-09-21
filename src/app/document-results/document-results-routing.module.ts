import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentResultsPage } from './document-results.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentResultsPageRoutingModule {}
