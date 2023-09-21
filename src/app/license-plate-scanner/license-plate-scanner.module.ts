import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LicensePlateScannerPageRoutingModule } from './license-plate-scanner-routing.module';

import { LicensePlateScannerPage } from './license-plate-scanner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicensePlateScannerPageRoutingModule
  ],
  declarations: [LicensePlateScannerPage]
})
export class LicensePlateScannerPageModule {}
