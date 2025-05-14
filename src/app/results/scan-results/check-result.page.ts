import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ScanResultFieldsPage, ScanResultSection } from './scan-result-page/scan-result.page';

import { autorelease, CheckScanningResult } from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-check-result',
  templateUrl: './scan-result-page/scan-result.page.html',
  styleUrls: ['./scan-result-page/scan-result.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CheckResultPage extends ScanResultFieldsPage {
  override pageTitle: string = 'Check Result';

  private checkResult!: CheckScanningResult;

  constructor() {
    super();
  }

  override async ngOnInit() {
    const serializedCheckResult = JSON.parse(
      this.activatedRoute.snapshot.paramMap.get('checkResult') as string,
    );

    /**
     * Because we serialized the result image as a reference, we need to use an autorelease pool again.
     * Having the image as a reference allows us to choose whether to encode it (as base64 buffer), extract information, or save it to a file path.
     * In this example, we’ll encode the image and use them as base64 buffer.
     */
    await autorelease(async () => {
      this.checkResult = new CheckScanningResult(serializedCheckResult);
      await this.checkResult.encodeImages();
    });

    super.ngOnInit();
  }

  override loadResultFields(): Array<ScanResultSection> {
    return [
      {
        image: this.checkResult.croppedImage?.buffer,
        data: [{ key: 'Status', value: this.checkResult.status }],
      },
      {
        data: this.scanbotUtils.transformGenericDocument(this.checkResult.check!, true),
      },
    ];
  }
}
