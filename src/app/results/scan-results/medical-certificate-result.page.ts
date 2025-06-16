import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import {
  ScanResultFieldsPage,
  ScanResultSection,
  ScanResultSectionData,
} from './scan-result-page/scan-result.page';

import { MedicalCertificateScanningResult } from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-medical-certificate-result',
  templateUrl: './scan-result-page/scan-result.page.html',
  styleUrls: ['./scan-result-page/scan-result.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MedicalCertificateResultPage extends ScanResultFieldsPage {
  override pageTitle: string = 'Medical Certificate Result';

  private medicalCertificateScannerResult!: MedicalCertificateScanningResult;

  constructor() {
    super();
  }

  override async ngOnInit() {
    const serializedCertificate = JSON.parse(
      this.activatedRoute.snapshot.paramMap.get('medicalCert') as string,
    );
    this.medicalCertificateScannerResult = new MedicalCertificateScanningResult(
      serializedCertificate,
    );

    super.ngOnInit();
  }

  override loadResultFields(): Array<ScanResultSection> {
    let resultFields: Array<ScanResultSection> = [
      {
        image: this.medicalCertificateScannerResult.croppedImage?.buffer,
      },
      {
        data: [{ key: 'Form Type', value: this.medicalCertificateScannerResult.formType }],
      },
    ];

    const patientData = this.transformPatientData();
    if (patientData.length > 0) {
      resultFields.push({
        header: 'Patient Data',
        data: this.transformPatientData(),
      });
    }

    const dates = this.transformDates();
    if (dates.length > 0) {
      resultFields.push({
        header: 'Dates',
        data: this.transformDates(),
      });
    }

    const checkboxes = this.transformCheckboxes();
    if (checkboxes.length > 0) {
      resultFields.push({
        header: 'Checkboxes',
        data: this.transformCheckboxes(),
      });
    }

    return resultFields;
  }

  private transformPatientData(): Array<ScanResultSectionData> {
    let patientData: ScanResultSectionData[] = [];

    this.medicalCertificateScannerResult.patientInfoBox.fields.forEach((item, index) => {
      patientData.push({
        key: `Patient Data #${index + 1}`,
        value: JSON.stringify(item.serialize(), null, 2),
      });
    });

    return patientData;
  }

  private transformDates(): Array<ScanResultSectionData> {
    let dates: ScanResultSectionData[] = [];

    this.medicalCertificateScannerResult.dates.forEach((item, index) => {
      dates.push({
        key: `Dates #${index + 1}`,
        value: JSON.stringify(item.serialize(), null, 2),
      });
    });

    return dates;
  }

  private transformCheckboxes(): Array<ScanResultSectionData> {
    let checkboxes: ScanResultSectionData[] = [];

    this.medicalCertificateScannerResult.checkBoxes.forEach((item, index) => {
      checkboxes.push({
        key: `Checkbox #${index + 1}`,
        value: JSON.stringify(item.serialize(), null, 2),
      });
    });

    return checkboxes;
  }
}
