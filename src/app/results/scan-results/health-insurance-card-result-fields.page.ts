import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ScanResultFieldsPage, ScanResultSection } from './scan-result-page/scan-result.page';

import { EuropeanHealthInsuranceCardRecognitionResult } from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'health-insurance-card-result-fields',
  templateUrl: './scan-result-page/scan-result.page.html',
  styleUrls: ['./scan-result-page/scan-result.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class EhicResultFieldsPage extends ScanResultFieldsPage {
  override pageTitle: string = 'EHIC Result Fields';

  private fields!: EuropeanHealthInsuranceCardRecognitionResult.Field[];

  constructor() {
    super();
  }

  override async ngOnInit() {
    const serializedFields: any[] = JSON.parse(
      this.activatedRoute.snapshot.paramMap.get('fields') as string,
    );

    this.fields = serializedFields.map(
      (field) => new EuropeanHealthInsuranceCardRecognitionResult.Field(field),
    );

    super.ngOnInit();
  }

  override loadResultFields(): Array<ScanResultSection> {
    return [
      {
        data: this.fields.map((field) => ({
          key: field.type,
          value: `${field.value} (confidence:${Math.round(field.confidence * 100)}%)`,
        })),
      },
    ];
  }
}
