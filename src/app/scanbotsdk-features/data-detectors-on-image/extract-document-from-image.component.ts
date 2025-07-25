import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Feature } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature-component/scanbotsdk-feature.component';

import {
  DocumentDataExtractorCommonConfiguration,
  DocumentDataExtractorConfiguration,
  DeIdCardFrontDocumentType,
  DeIdCardBackDocumentType,
  DeResidencePermitBackDocumentType,
  DeResidencePermitFrontDocumentType,
  MrzFallbackConfiguration,
  ScanbotSDK,
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

      const commonConfig = new DocumentDataExtractorCommonConfiguration();

      /**
       * Accept only specific document types by setting acceptedDocumentTypes.
       */
      // commonConfig.acceptedDocumentTypes = [DeIdCardFrontDocumentType, DeIdCardBackDocumentType, DeResidencePermitFrontDocumentType, DeResidencePermitBackDocumentType];

      const mrzFallbackConfiguration = new MrzFallbackConfiguration();
      mrzFallbackConfiguration.acceptedMRZTypes = ['ID_CARD', 'PASSPORT'];

      const configuration = new DocumentDataExtractorConfiguration({
        configurations: [commonConfig, mrzFallbackConfiguration],
      });

      // Configure other parameters as needed.

      const result = await ScanbotSDK.documentDataExtractor(imageFileUri, configuration);

      this.utils.dismissLoader();

      /**
       * Handle the result if a document is found
       */
      if (result.document) {
        /**
         * Always serialize the extracted document before stringifying, and use the serialized result.
         */
        const serializedDocument = await result.document.serialize();

        this.router.navigate([
          '/document-data-extractor-result',
          result.status,
          JSON.stringify(serializedDocument),
        ]);
      } else {
        this.utils.showInfoAlert('No document recognized.');
      }
    } catch (e: any) {
      await this.utils.dismissLoader();
      this.utils.showErrorAlert(e.message);
    }
  }
}
