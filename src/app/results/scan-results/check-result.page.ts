import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ScanResultFieldsPage, ScanResultSection } from './scan-result-page/scan-result.page';

import { autorelease, GenericDocument, ImageRef } from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-check-result',
  templateUrl: './scan-result-page/scan-result.page.html',
  styleUrls: ['./scan-result-page/scan-result.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CheckResultPage extends ScanResultFieldsPage {
  override pageTitle: string = 'Check Result';

  private status!: string;
  private check!: GenericDocument;
  private croppedImage?: string | null;

  constructor() {
    super();
  }

  override async ngOnInit() {
    this.status = this.activatedRoute.snapshot.paramMap.get('status') as string;

    const serializedCheck = JSON.parse(
      this.activatedRoute.snapshot.paramMap.get('check') as string,
    );
    this.check = new GenericDocument(serializedCheck);

    /**
     * Because we serialized the result image as a reference, we need to use an autorelease pool again.
     * Having the image as a reference allows us to choose whether to encode it (as base64 buffer), extract information, or save it to a file path.
     * In this example, we’ll encode the image and use them as base64 buffer.
     */
    const imageRefId = this.activatedRoute.snapshot.paramMap.get('imageRefId');
    if (imageRefId) {
      await autorelease(async () => {
        this.croppedImage = await ImageRef.From({
          uniqueId: imageRefId,
        }).encodeImage();
      });
    }

    super.ngOnInit();
  }

  override loadResultFields(): Array<ScanResultSection> {
    return [
      {
        image: this.croppedImage,
        data: [{ key: 'Status', value: this.status }],
      },
      ...this.scanbotUtils.transformGenericDocument(this.check),
    ];
  }
}
