import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Colors } from 'src/theme/theme';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature-component/scanbotsdk-feature.component';

import {
  CreditCardScannerScreenConfiguration,
  startCreditCardScanner,
  StyledText,
} from 'capacitor-plugin-scanbot-sdk/ui_v2';

@Component({
  selector: 'app-rtu-credit-card-scanner',
  templateUrl: '../scanbotsdk-feature-component/scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature-component/scanbotsdk-feature.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class RtuCreditCardScannerFeature extends ScanbotSdkFeatureComponent {
  override feature = { title: 'Scan Credit Card' };

  override async featureClicked() {
    // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    if (!(await this.isLicenseValid())) {
      return;
    }

    try {
      const configuration = new CreditCardScannerScreenConfiguration();

      // Set colors
      configuration.palette.sbColorPrimary = Colors.scanbotRed;
      configuration.palette.sbColorOnPrimary = '#ffffff';

      // Add a top guidance title
      configuration.topUserGuidance.title = new StyledText({
        text: 'Scan Credit Card',
        color: Colors.scanbotRed,
        useShadow: true,
      });

      // Modify the action bar
      configuration.actionBar.flipCameraButton.visible = false;
      configuration.actionBar.flashButton.activeForegroundColor = Colors.scanbotRed;

      // Configure other parameters as needed.

      const result = await startCreditCardScanner(configuration);

      /**
       * Handle the result if the result status is OK
       */
      if (result.status === 'OK' && result.data.creditCard) {
        // Always serialize the credit card before stringifying, and use the serialized result.
        const serializedCreditCard = await result.data.creditCard.serialize();

        this.router.navigate([
          '/credit-card-result',
          result.data.recognitionStatus,
          JSON.stringify(serializedCreditCard),
        ]);
      }
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }
}
