import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Feature } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature-component/scanbotsdk-feature.component';

import { MedicalCertificateScanningParameters, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-recognize-medical-certificate-on-image',
  templateUrl: '../scanbotsdk-feature-component/scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature-component/scanbotsdk-feature.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class RecognizeMedicalCertificateOnImageFeature extends ScanbotSdkFeatureComponent {
  override feature: Feature = {
    title: 'Recognize Medical Certificate on Image',
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

      const configiration = new MedicalCertificateScanningParameters();
      configiration.recognizePatientInfoBox = true;

      // Configure other parameters as needed.

      const result = await ScanbotSDK.recognizeMedicalCertificate(imageFileUri, configiration);

      this.utils.dismissLoader();

      /**
       * Handle the result if scanning is successful
       */
      if (result.scanningSuccessful) {
        // Always serialize the medical certificate result before stringifying, and use the serialized result.
        const serializedCert = await result.serialize();

        this.router.navigate(['/medical-certificate-result', JSON.stringify(serializedCert)]);
      } else {
        this.utils.showInfoAlert('No Medical Certificate found.');
      }
    } catch (e: any) {
      await this.utils.dismissLoader();
      this.utils.showErrorAlert(e.message);
    }
  }
}
