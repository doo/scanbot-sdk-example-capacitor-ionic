import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenericDocResultsPageRoutingModule } from './generic-doc-results-routing.module';

import { GenericDocResultsPage } from './generic-doc-results.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenericDocResultsPageRoutingModule
  ],
  declarations: [GenericDocResultsPage]
})
export class GenericDocResultsPageModule {}
