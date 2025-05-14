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
      const configuration = new TextPatternScannerScreenConfiguration();

      // Set colors
      configuration.palette.sbColorPrimary = Colors.scanbotRed;
      configuration.palette.sbColorOnPrimary = '#ffffff';

      // Modify the action bar
      configuration.actionBar.flipCameraButton.visible = false;
      configuration.actionBar.flashButton.activeForegroundColor = Colors.scanbotRed;

      configuration.scannerConfiguration.minimumNumberOfRequiredFramesWithEqualScanningResult = 3;

      // Configure other parameters as needed.

      const result = await startTextPatternScanner(configuration);

      /**
       * Handle the result if the result status is OK
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
