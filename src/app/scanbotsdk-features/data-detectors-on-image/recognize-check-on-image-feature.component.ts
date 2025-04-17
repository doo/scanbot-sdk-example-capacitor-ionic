import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Feature } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature-component/scanbotsdk-feature.component';

import { CheckScannerConfiguration, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-recognize-check-on-image',
  templateUrl: '../scanbotsdk-feature-component/scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature-component/scanbotsdk-feature.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class RecognizeCheckOnImageFeature extends ScanbotSdkFeatureComponent {
  override feature: Feature = {
    title: 'Recognize Check on Image',
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

      const configiration = new CheckScannerConfiguration();
      configiration.documentDetectionMode = 'DISABLED';

      // Configure other parameters as needed.

      const result = await ScanbotSDK.recognizeCheck(imageFileUri, configiration);

      this.utils.dismissLoader();

      /**
       * Handle the result if check is found
       */
      if (result.check) {
        // Always serialize the result before stringifying, and use the serialized result.
        const serializedResult = await result.serialize();

        this.router.navigate(['/check-result', JSON.stringify(serializedResult)]);
      } else {
        this.utils.showInfoAlert('No Check found.');
      }
    } catch (e: any) {
      await this.utils.dismissLoader();
      this.utils.showErrorAlert(e.message);
    }
  }
}
