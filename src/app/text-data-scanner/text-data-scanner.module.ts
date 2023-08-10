import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextDataScannerPageRoutingModule } from './text-data-scanner-routing.module';

import { TextDataScannerPage } from './text-data-scanner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextDataScannerPageRoutingModule
  ],
  declarations: [TextDataScannerPage]
})
export class TextDataScannerPageModule {}
