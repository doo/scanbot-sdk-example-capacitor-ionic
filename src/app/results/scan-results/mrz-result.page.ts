import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ScanResultFieldsPage, ScanResultSection } from './scan-result-page/scan-result.page';

import { GenericDocument } from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-mrz-result',
  templateUrl: './scan-result-page/scan-result.page.html',
  styleUrls: ['./scan-result-page/scan-result.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MrzResultPage extends ScanResultFieldsPage {
  override pageTitle: string = 'MRZ Result';

  private rawMRZ!: string;
  private mrzDocument!: GenericDocument;

  constructor() {
    super();
  }

  override async ngOnInit() {
    this.rawMRZ = this.activatedRoute.snapshot.paramMap.get('rawMRZ') as string;

    const serializedMRZ = JSON.parse(
      this.activatedRoute.snapshot.paramMap.get('mrzDocument') as string,
    );
    this.mrzDocument = new GenericDocument(serializedMRZ);

    super.ngOnInit();
  }

  override loadResultFields(): Array<ScanResultSection> {
    return [
      { data: [{ key: 'Raw MRZ', value: this.rawMRZ }] },
      { data: this.scanbotUtils.transformGenericDocument(this.mrzDocument) },
    ];
  }
}
