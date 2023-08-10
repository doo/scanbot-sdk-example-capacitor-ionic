import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalCertificateScannerPageRoutingModule } from './medical-certificate-scanner-routing.module';

import { MedicalCertificateScannerPage } from './medical-certificate-scanner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalCertificateScannerPageRoutingModule
  ],
  declarations: [MedicalCertificateScannerPage]
})
export class MedicalCertificateScannerPageModule {}
