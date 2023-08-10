import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckResultsPageRoutingModule } from './check-results-routing.module';

import { CheckResultsPage } from './check-results.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckResultsPageRoutingModule
  ],
  declarations: [CheckResultsPage]
})
export class CheckResultsPageModule {}
