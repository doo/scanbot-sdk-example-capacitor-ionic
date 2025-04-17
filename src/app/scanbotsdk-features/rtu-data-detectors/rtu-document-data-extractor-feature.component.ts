import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature-component/scanbotsdk-feature.component';

import {
  autorelease,
  DocumentDataExtractorScreenConfiguration,
  ScanbotSDK,
  ToJsonConfiguration,
} from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-rtu-document-data-extractor',
  templateUrl: '../scanbotsdk-feature-component/scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature-component/scanbotsdk-feature.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class RtuDocumentDataExtractorFeature extends ScanbotSdkFeatureComponent {
  override feature = {
    title: 'Extract Document Data',
  };

  override async featureClicked() {
    // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
    if (!(await this.isLicenseValid())) {
      return;
    }

    try {
      const configiration: DocumentDataExtractorScreenConfiguration = {
        finderLineColor: '#ff0000',
      };

      // Configure other parameters as needed.

      // An autorelease pool is required only because the result object contains image references.
      await autorelease(async () => {
        const result = await ScanbotSDK.startDocumentDataExtractor(configiration);

        /**
         * Handle the result if result status is OK
         */
        if (result.status === 'OK' && result.data) {
          /**
           * Always serialize the extracted documents before stringifying, and use the serialized result.
           *
           * By default, when we serialize, images are serialized as references.
           * When we have images as references, we need to ensure their proper release using an autorelease pool.
           *
           * Since we only need to preview these images on the result screen, we can serialize them as buffers and immediately release the references from here.
           */
          const serializedDocuments = await Promise.all(
            result.data.map((document) =>
              document.serialize(new ToJsonConfiguration({ imageSerializationMode: 'BUFFER' })),
            ),
          );

          this.router.navigate([
            '/document-data-extractor-result',
            JSON.stringify(serializedDocuments),
          ]);
        }
      });
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }
}
