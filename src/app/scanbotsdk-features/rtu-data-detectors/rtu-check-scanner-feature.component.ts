import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Colors } from 'src/theme/theme';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature-component/scanbotsdk-feature.component';

import {
  autorelease,
  CheckScannerScreenConfiguration,
  ScanbotSDK,
} from 'capacitor-plugin-scanbot-sdk';

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
      const configuration: CheckScannerScreenConfiguration = {
        // Customize colors, text resources, behavior, etc..
        enableCameraButtonTitle: 'Enable Camera',
        orientationLockMode: 'PORTRAIT',
        topBarBackgroundColor: Colors.scanbotRed,
        // see further configs ...
      };

      // An autorelease pool is required only because the result object contains image references.
      await autorelease(async () => {
        const result = await ScanbotSDK.startCheckScanner(configuration);

        /**
         * Handle the result if the result status is OK
         */
        if (result.status === 'OK' && result.data.check) {
          /**
           * Always serialize the result before stringifying, and use the serialized result.
           *
           * By default, when we serialize, images are serialized as references.
           * When we have images as references, we need to ensure their proper release using an autorelease pool.
           */
          const serializedResult = await result.data.serialize();

          this.router.navigate(['/check-result', JSON.stringify(serializedResult)]);
        }
      });
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }
}
