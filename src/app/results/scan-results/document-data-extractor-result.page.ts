import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ScanResultFieldsPage, ScanResultSection } from './scan-result-page/scan-result.page';

import { DocumentDataExtractionResult } from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-document-data-extractor-result',
  templateUrl: './scan-result-page/scan-result.page.html',
  styleUrls: ['./scan-result-page/scan-result.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DocumentDataExtractorResultPage extends ScanResultFieldsPage {
  override pageTitle: string = 'Document Data Result';

  private extractedDocuments!: DocumentDataExtractionResult[];

  constructor() {
    super();
  }

  override async ngOnInit() {
    const serializedDocuments: any[] = JSON.parse(
      this.activatedRoute.snapshot.paramMap.get('documents') as string,
    );
    this.extractedDocuments = serializedDocuments.map(
      (item) => new DocumentDataExtractionResult(item),
    );

    super.ngOnInit();
  }

  override loadResultFields(): Array<ScanResultSection> {
    let results: Array<ScanResultSection> = [];

    this.extractedDocuments.forEach((documentResult) => {
      if (documentResult.document != null) {
        results = results.concat(
          this.scanbotUtils.transformGenericDocument(documentResult.document, {
            includeConfidence: true,
            includeHeader: true,
          }),
        );
      }
    });

    return results;
  }
}
