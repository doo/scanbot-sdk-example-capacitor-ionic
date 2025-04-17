import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Feature } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature-component/scanbotsdk-feature.component';

import {
  autorelease,
  DeDriverLicenseBackDocumentType,
  DeDriverLicenseFrontDocumentType,
  DeHealthInsuranceCardFrontDocumentType,
  DeIdCardBackDocumentType,
  DeIdCardFrontDocumentType,
  DePassportDocumentType,
  DeResidencePermitBackDocumentType,
  DeResidencePermitFrontDocumentType,
  DocumentDataExtractorCommonConfiguration,
  DocumentDataExtractorConfiguration,
  EuropeanHealthInsuranceCardDocumentType,
  MRZDocumentType,
  ScanbotSDK,
  ToJsonConfiguration,
} from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-extract-document-data-from-image',
  templateUrl: '../scanbotsdk-feature-component/scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature-component/scanbotsdk-feature.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class ExtractDocumentDataFromImageFeature extends ScanbotSdkFeatureComponent {
  override feature: Feature = {
    title: 'Extract Document Data from Image',
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

      const commonConfig = new DocumentDataExtractorCommonConfiguration({
        acceptedDocumentTypes: [
          MRZDocumentType,
          DeIdCardFrontDocumentType,
          DeIdCardBackDocumentType,
          DePassportDocumentType,
          DeDriverLicenseFrontDocumentType,
          DeDriverLicenseBackDocumentType,
          DeResidencePermitFrontDocumentType,
          DeResidencePermitBackDocumentType,
          EuropeanHealthInsuranceCardDocumentType,
          DeHealthInsuranceCardFrontDocumentType,
        ],
      });

      const configiration = new DocumentDataExtractorConfiguration({
        configurations: [commonConfig],
      });

      // Configure other parameters as needed.

      // An autorelease pool is required only because the result object can contains image references.
      await autorelease(async () => {
        const result = await ScanbotSDK.documentDataExtractor(imageFileUri, configiration);

        this.utils.dismissLoader();

        /**
         * Handle the result if document is found
         */
        if (result.document) {
          /**
           * Always serialize the extracted document before stringifying, and use the serialized result.
           *
           * By default, when we serialize, images are serialized as references.
           * When we have images as references, we need to ensure their proper release using an autorelease pool.
           *
           * Since we only need to preview these images on the result screen, we can serialize them as buffers and immediately release the references from here.
           */
          const serializedDocument = await result.serialize(
            new ToJsonConfiguration({ imageSerializationMode: 'BUFFER' }),
          );

          this.router.navigate([
            '/document-data-extractor-result',
            JSON.stringify([serializedDocument]),
          ]);
        } else {
          this.utils.showInfoAlert('No document recognized.');
        }
      });
    } catch (e: any) {
      await this.utils.dismissLoader();
      this.utils.showErrorAlert(e.message);
    }
  }
}
