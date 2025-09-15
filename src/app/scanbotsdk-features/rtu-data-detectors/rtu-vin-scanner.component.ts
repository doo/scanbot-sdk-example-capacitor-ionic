import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Feature } from '../../utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature-component/scanbotsdk-feature.component';

import { startVINScanner, VinScannerScreenConfiguration } from 'capacitor-plugin-scanbot-sdk/ui_v2';

@Component({
  selector: 'app-rtu-vin-scanner',
  templateUrl: '../scanbotsdk-feature-component/scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature-component/scanbotsdk-feature.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class RtuVinScannerComponent extends ScanbotSdkFeatureComponent {
  override feature: Feature = {
    title: 'Scan VIN',
  };

  override async featureClicked() {
    // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    if (!(await this.isLicenseValid())) {
      return;
    }

    try {
      const configuration = new VinScannerScreenConfiguration();
      configuration.confirmationAlertDialogEnabled = false;

      // Configure other parameters as needed.

      const result = await startVINScanner(configuration);

      /**
       * Handle the result if the result status is OK
       */
      if (result.status === 'OK') {
        this.utils.showResultInfo(
          `• Raw Text: ${result.data.textResult.rawText} <br />` +
            `• Confidence: ${Math.round(result.data.textResult.confidence * 100)}% <br />` +
            `• Validation: ${result.data.textResult.validationSuccessful ? 'SUCCESSFUL' : 'NOT SUCCESSFUL'}`,
        );
      }
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }
}
