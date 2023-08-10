import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarcodeResultsPageRoutingModule } from './barcode-results-routing.module';

import { BarcodeResultsPage } from './barcode-results.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarcodeResultsPageRoutingModule
  ],
  declarations: [BarcodeResultsPage]
})
export class BarcodeResultsPageModule {}
