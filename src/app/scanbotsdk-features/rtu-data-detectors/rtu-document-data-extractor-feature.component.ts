import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature-component/scanbotsdk-feature.component';

import { autorelease, ToJsonConfiguration } from 'capacitor-plugin-scanbot-sdk';

import {
  DocumentDataExtractorScreenConfiguration,
  startDocumentDataExtractor,
} from 'capacitor-plugin-scanbot-sdk/ui_v2';

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
      const configuration = new DocumentDataExtractorScreenConfiguration();
      configuration.introScreen.explanation.visible = true;
      configuration.scannerConfiguration.returnCrops = true;

      // Configure other parameters as needed.

      // An autorelease pool is required only because the result object contains image references.
      await autorelease(async () => {
        const result = await startDocumentDataExtractor(configuration);

        /**
         * Handle the result if the result status is OK
         */
        if (result.status === 'OK' && result.data.document) {
          /**
           * Always serialize the extracted document before stringifying, and use the serialized result.
           *
           * By default, when we serialize, images are serialized as references.
           * When we have images as references, we need to ensure their proper release using an autorelease pool.
           *
           * Since we only need to preview these images on the result screen, we can serialize them as buffers and immediately release the references from here.
           */
          const serializedDocument = await result.data.document.serialize(
            new ToJsonConfiguration({ imageSerializationMode: 'BUFFER' }),
          );

          /**
           * Serialize the cropped image as buffer.
           */
          if (result.data.croppedImage) {
            const imageAsBuffer = await result.data.croppedImage.encodeImage();
            this.router.navigate([
              '/document-data-extractor-result',
              result.data.recognitionStatus,
              JSON.stringify(serializedDocument),
              imageAsBuffer,
            ]);
          } else {
            this.router.navigate([
              '/document-data-extractor-result',
              result.data.recognitionStatus,
              JSON.stringify(serializedDocument),
            ]);
          }
        }
      });
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }
}
