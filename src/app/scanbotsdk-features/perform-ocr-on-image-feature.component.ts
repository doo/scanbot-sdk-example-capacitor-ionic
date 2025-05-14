import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Feature } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from './scanbotsdk-feature-component/scanbotsdk-feature.component';

import { ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-perform-ocr-on-image',
  templateUrl: './scanbotsdk-feature-component/scanbotsdk-feature.component.html',
  styleUrls: ['./scanbotsdk-feature-component/scanbotsdk-feature.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class PerformOcrOnImageFeature extends ScanbotSdkFeatureComponent {
  override feature: Feature = {
    title: 'Perform OCR on Image',
  };

  override async featureClicked() {
    // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    if (!(await this.isLicenseValid())) {
      return;
    }

    // Select image from the library
    const imageFileUri = await this.imageUtils.selectImageFromLibrary();
    if (!imageFileUri) {
      return;
    }

    try {
      await this.utils.showLoader();

      const result = await ScanbotSDK.performOCR({
        imageFileUris: [imageFileUri],
        ocrConfiguration: {
          engineMode: 'SCANBOT_OCR',
        },
      });

      this.utils.dismissLoader();

      // Handle the results if there are any recognized pages.
      if (result.pages.length > 0) {
        this.utils.showResultInfo(result.plainText);
      } else {
        this.utils.showWarningAlert('Recognition returned no results.');
      }
    } catch (e: any) {
      await this.utils.dismissLoader();
      this.utils.showErrorAlert(e.message);
    }
  }
}
