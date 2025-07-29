import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature-component/scanbotsdk-feature.component';

import { autorelease } from 'capacitor-plugin-scanbot-sdk';

import {
  CheckScannerScreenConfiguration,
  startCheckScanner,
} from 'capacitor-plugin-scanbot-sdk/ui_v2';

@Component({
  selector: 'app-rtu-check-scanner',
  templateUrl: '../scanbotsdk-feature-component/scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature-component/scanbotsdk-feature.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class RtuCheckScannerFeature extends ScanbotSdkFeatureComponent {
  override feature = { title: 'Scan Check' };

  override async featureClicked() {
    // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    if (!(await this.isLicenseValid())) {
      return;
    }

    try {
      const configuration = new CheckScannerScreenConfiguration();
      configuration.captureHighResolutionImage = true;

      // Configure other parameters as needed.

      // An autorelease pool is required only because the result object contains image references.
      await autorelease(async () => {
        const result = await startCheckScanner(configuration);

        /**
         * Handle the result if the result status is OK
         */
        if (result.status === 'OK' && result.data.check) {
          /**
           * Always serialize the result check before stringifying, and use the serialized result.
           */
          const serializedCheck = await result.data.check.serialize();

          /**
           * Serialize the cropped image as reference.
           * When we have images as references, we need to ensure their proper release using an autorelease pool.
           */
          if (result.data.croppedImage) {
            await result.data.croppedImage.serialize('REFERENCE');
            this.router.navigate([
              '/check-result',
              result.data.recognitionStatus,
              JSON.stringify(serializedCheck),
              result.data.croppedImage.uniqueId,
            ]);
          } else {
            this.router.navigate([
              '/check-result',
              result.data.recognitionStatus,
              JSON.stringify(serializedCheck),
            ]);
          }
        }
      });
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }
}
