import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Feature } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature-component/scanbotsdk-feature.component';

import {
  autorelease,
  ImageRef,
  MrzScannerConfiguration,
  ScanbotMrz,
} from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-recognize-mrz-on-image',
  templateUrl: '../scanbotsdk-feature-component/scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature-component/scanbotsdk-feature.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class RecognizeMrzOnImageFeature extends ScanbotSdkFeatureComponent {
  override feature: Feature = {
    title: 'Recognize MRZ on Image',
  };

  override async featureClicked() {
    // Always make sure you have a valid license at runtime via ScanbotSDK.getLicenseInfo()
    if (!(await this.isLicenseValid())) {
      return;
    }

    // Select an image from the library
    const imageFileUri = await this.imageUtils.selectImageFromLibrary();
    if (!imageFileUri) {
      return;
    }

    try {
      await this.utils.showLoader();

      const configuration = new MrzScannerConfiguration();
      configuration.incompleteResultHandling = 'REJECT';
      // Configure other parameters as needed.

      /**
       * Note: ImageRef is used as an input here just to showcase its usage.
       * Passing the image file URI directly to ScanbotMrz.scanFromImage() will work the same way.
       * The autorelease pool is only necessary when working with ImageRef to manage native resources.
       */
      await autorelease(async () => {
        const imageRef = await ImageRef.fromImageFileUri(imageFileUri);
        if (!imageRef) {
          return;
        }

        const result = await ScanbotMrz.scanFromImage({
          image: imageRef,
          configuration,
        });

        this.utils.dismissLoader();

        /**
         * Handle the result if a document is found
         */
        if (result.document) {
          // Always serialize the MRZ document before stringifying, and use the serialized result.
          const serializedDocument = await result.document.serialize();

          this.router.navigate(['/mrz-result', result.rawMRZ, JSON.stringify(serializedDocument)]);
        } else {
          this.utils.showInfoAlert('No MRZ found.');
        }
      });
    } catch (e: any) {
      await this.utils.dismissLoader();
      this.utils.showErrorAlert(e.message);
    }
  }
}
