import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MrzScannerPageRoutingModule } from './mrz-scanner-routing.module';

import { MrzScannerPage } from './mrz-scanner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MrzScannerPageRoutingModule
  ],
  declarations: [MrzScannerPage]
})
export class MrzScannerPageModule {}
