import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Colors } from 'src/theme/theme';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature-component/scanbotsdk-feature.component';

import {
  autorelease,
  MedicalCertificateScannerConfiguration,
  ScanbotSDK,
  ToJsonConfiguration,
} from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-rtu-medical-certificate-scanner',
  templateUrl: '../scanbotsdk-feature-component/scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature-component/scanbotsdk-feature.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class RtuMedicalCertificateScannerFeature extends ScanbotSdkFeatureComponent {
  override feature = {
    title: 'Scan Medical Certificate',
  };

  override async featureClicked() {
    // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    if (!(await this.isLicenseValid())) {
      return;
    }

    try {
      const configiration: MedicalCertificateScannerConfiguration = {
        // Customize colors, text resources, behavior, etc..
        topBarBackgroundColor: Colors.scanbotRed,
        userGuidanceStrings: {
          capturing: 'Capturing',
          scanning: 'Recognizing',
          processing: 'Processing',
          startScanning: 'Scanning started',
          paused: 'Paused',
          energySaving: 'Energy saving',
        },
        errorDialogMessage: 'An unexpected error occured.',
        errorDialogOkButton: 'OK',
        errorDialogTitle: 'ERROR',
        cancelButtonHidden: false,
        recognizePatientInfo: true,
        // see further configs...
      };

      // An autorelease pool is required only because the result object contains image references.
      await autorelease(async () => {
        const result = await ScanbotSDK.startMedicalCertificateScanner(configiration);

        /**
         * Handle the result if result status is OK
         */
        if (result.status === 'OK') {
          /**
           * Always serialize the medical certificate result before stringifying, and use the serialized result.
           *
           * By default, when we serialize, images are serialized as references.
           * When we have images as references, we need to ensure their proper release using an autorelease pool.
           *
           * Since we only need to preview these images on the result screen, we can serialize them as buffers and immediately release the references from here.
           */
          const serializedMedicalCert = await result.data.serialize(
            new ToJsonConfiguration({ imageSerializationMode: 'BUFFER' }),
          );

          this.router.navigate([
            '/medical-certificate-result',
            JSON.stringify(serializedMedicalCert),
          ]);
        }
      });
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }
}
