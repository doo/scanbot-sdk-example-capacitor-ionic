import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Feature } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature-component/scanbotsdk-feature.component';

import {
  EuropeanHealthInsuranceCardRecognizerConfiguration,
  ScanbotSDK,
} from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-recognize-ehic-on-image',
  templateUrl: '../scanbotsdk-feature-component/scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature-component/scanbotsdk-feature.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class RecognizeEhicOnImageFeature extends ScanbotSdkFeatureComponent {
  override feature: Feature = {
    title: 'Recognize EHIC on Image',
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

      const configuration = new EuropeanHealthInsuranceCardRecognizerConfiguration();
      configuration.maxExpirationYear = 2100;

      // Configure other parameters as needed.

      const result = await ScanbotSDK.recognizeEHIC(imageFileUri, configuration);

      this.utils.dismissLoader();

      /**
       * Handle the result if some fields are found
       */
      if (result.fields.length > 0) {
        // Always serialize the result fields before stringifying, and use the serialized result.
        const serializedFields = result.fields.map((field) => field.serialize());

        this.router.navigate([
          '/health-insurance-card-result-fields',
          JSON.stringify(serializedFields),
        ]);
      } else {
        this.utils.showInfoAlert('No EHIC found.');
      }
    } catch (e: any) {
      await this.utils.dismissLoader();
      this.utils.showErrorAlert(e.message);
    }
  }
}
