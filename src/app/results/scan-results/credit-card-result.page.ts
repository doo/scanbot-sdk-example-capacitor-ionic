import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ScanResultFieldsPage, ScanResultSection } from './scan-result-page/scan-result.page';

import { GenericDocument } from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-credit-card-result',
  templateUrl: './scan-result-page/scan-result.page.html',
  styleUrls: ['./scan-result-page/scan-result.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CreditCardResultPage extends ScanResultFieldsPage {
  override pageTitle: string = 'Credit Card Result';

  private scanningStatus!: string;
  private creditCard!: GenericDocument;

  constructor() {
    super();
  }

  override async ngOnInit() {
    this.scanningStatus = this.activatedRoute.snapshot.paramMap.get('status') as string;

    const serializedCreditCard = JSON.parse(
      this.activatedRoute.snapshot.paramMap.get('creditCard') as string,
    );
    this.creditCard = new GenericDocument(serializedCreditCard);

    super.ngOnInit();
  }

  override loadResultFields(): Array<ScanResultSection> {
    return [
      {
        image: this.creditCard.crop?.buffer,
        data: [{ key: 'Status', value: this.scanningStatus }],
      },
      {
        data: this.scanbotUtils.transformGenericDocument(this.creditCard),
      },
    ];
  }
}
