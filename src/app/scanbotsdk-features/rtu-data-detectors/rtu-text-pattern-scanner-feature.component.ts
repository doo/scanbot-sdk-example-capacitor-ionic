import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Colors } from 'src/theme/theme';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature-component/scanbotsdk-feature.component';

import {
  TextPatternScannerScreenConfiguration,
  startTextPatternScanner,
} from 'capacitor-plugin-scanbot-sdk/ui_v2';

@Component({
  selector: 'app-rtu-text-pattern-scanner',
  templateUrl: '../scanbotsdk-feature-component/scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature-component/scanbotsdk-feature.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class RtuTextPatternScannerFeature extends ScanbotSdkFeatureComponent {
  override feature = { title: 'Scan Text Pattern' };

  override async featureClicked() {
    // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    if (!(await this.isLicenseValid())) {
      return;
    }

    try {
      const configiration = new TextPatternScannerScreenConfiguration();

      // Set colors
      configiration.palette.sbColorPrimary = Colors.scanbotRed;
      configiration.palette.sbColorOnPrimary = '#ffffff';

      // Modify the action bar
      configiration.actionBar.flipCameraButton.visible = false;
      configiration.actionBar.flashButton.activeForegroundColor = Colors.scanbotRed;

      configiration.scannerConfiguration.minimumNumberOfRequiredFramesWithEqualScanningResult = 3;

      // Configure other parameters as needed.

      const result = await startTextPatternScanner(configiration);

      /**
       * Handle the result if result status is OK
       */
      if (result.status === 'OK') {
        this.utils.showResultInfo(
          `• Text: ${result.data.rawText} <br />` +
            `• Confidence: ${Math.round(result.data.confidence * 100)}%`,
        );
      }
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }
}
