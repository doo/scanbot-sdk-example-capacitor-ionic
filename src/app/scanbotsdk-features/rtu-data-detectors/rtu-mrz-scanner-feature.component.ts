import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Colors } from 'src/theme/theme';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature-component/scanbotsdk-feature.component';

import {
  MrzScannerScreenConfiguration,
  startMRZScanner,
  StyledText,
} from 'capacitor-plugin-scanbot-sdk/ui_v2';

@Component({
  selector: 'app-rtu-mrz-scanner',
  templateUrl: '../scanbotsdk-feature-component/scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature-component/scanbotsdk-feature.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class RtuMrzScannerFeature extends ScanbotSdkFeatureComponent {
  override feature = { title: 'Scan MRZ' };

  override async featureClicked() {
    // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    if (!(await this.isLicenseValid())) {
      return;
    }

    try {
      const configiration = new MrzScannerScreenConfiguration();

      // Set colors
      configiration.palette.sbColorPrimary = Colors.scanbotRed;
      configiration.palette.sbColorOnPrimary = '#ffffff';

      // Add a top guidance title
      configiration.topUserGuidance.title = new StyledText({
        text: 'Scan MRZ',
        color: Colors.scanbotRed,
        useShadow: true,
      });

      // Modify the action bar
      configiration.actionBar.flipCameraButton.visible = false;
      configiration.actionBar.flashButton.activeForegroundColor = Colors.scanbotRed;

      // Configure the scanner
      configiration.scannerConfiguration.incompleteResultHandling = 'ACCEPT';

      // Configure other parameters as needed.

      const result = await startMRZScanner(configiration);

      /**
       * Handle the result if result status is OK
       */
      if (result.status === 'OK' && result.data.mrzDocument) {
        // Always serialize the MRZ document before stringifying, and use the serialized result.
        const serializedMrzDocument = await result.data.mrzDocument.serialize();

        this.router.navigate([
          '/mrz-result',
          result.data.rawMRZ,
          JSON.stringify(serializedMrzDocument),
        ]);
      }
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }
}
