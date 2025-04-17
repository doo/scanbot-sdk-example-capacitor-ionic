import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature-component/scanbotsdk-feature.component';

import { HealthInsuranceCardScannerConfiguration, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-rtu-health-insurance-card-scanner',
  templateUrl: '../scanbotsdk-feature-component/scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature-component/scanbotsdk-feature.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class RtuHealthInsuranceCardScannerFeature extends ScanbotSdkFeatureComponent {
  override feature = {
    title: 'Scan EHIC',
  };

  override async featureClicked() {
    // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    if (!(await this.isLicenseValid())) {
      return;
    }

    try {
      const configiration: HealthInsuranceCardScannerConfiguration = {
        // Customize colors, text resources, behavior, etc..
        finderLineColor: '#ff0000',
        finderTextHint: 'Please hold your phone over the back of your Health Insurance Card.',
        orientationLockMode: 'PORTRAIT',
        // see further configs ...
      };

      const result = await ScanbotSDK.startEHICScanner(configiration);

      /**
       * Handle the result if result status is OK
       */
      if (result.status === 'OK' && result.data && result.data.fields.length > 0) {
        // Always serialize the result fields before stringifying, and use the serialized result.
        const serializedFields = result.data.fields.map((field) => field.serialize());

        this.router.navigate([
          '/health-insurance-card-result-fields',
          JSON.stringify(serializedFields),
        ]);
      }
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }
}
