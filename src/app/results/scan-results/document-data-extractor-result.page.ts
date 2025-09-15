import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ScanResultFieldsPage, ScanResultSection } from './scan-result-page/scan-result.page';

import { GenericDocument } from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-document-data-extractor-result',
  templateUrl: './scan-result-page/scan-result.page.html',
  styleUrls: ['./scan-result-page/scan-result.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DocumentDataExtractorResultPage extends ScanResultFieldsPage {
  override pageTitle: string = 'Document Data Result';

  private status!: string;
  private extractedDocument!: GenericDocument;
  private croppedImage?: string | null;

  constructor() {
    super();
  }

  override async ngOnInit() {
    this.status = this.activatedRoute.snapshot.paramMap.get('status') as string;

    const serializedDocument = JSON.parse(
      this.activatedRoute.snapshot.paramMap.get('document') as string,
    );
    this.extractedDocument = new GenericDocument(serializedDocument);

    this.croppedImage = this.activatedRoute.snapshot.paramMap.get('image');

    super.ngOnInit();
  }

  override loadResultFields(): Array<ScanResultSection> {
    return [
      {
        image: this.croppedImage,
        data: [{ key: 'Status', value: this.status }],
      },
      ...this.scanbotUtils.transformGenericDocument(this.extractedDocument, {
        includeConfidence: true,
        includeHeader: true,
      }),
    ];
  }
}
