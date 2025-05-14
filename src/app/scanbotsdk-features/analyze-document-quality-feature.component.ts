import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from './scanbotsdk-feature-component/scanbotsdk-feature.component';

import { DocumentQualityAnalyzerConfiguration, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-analyze-document-quality',
  templateUrl: './scanbotsdk-feature-component/scanbotsdk-feature.component.html',
  styleUrls: ['./scanbotsdk-feature-component/scanbotsdk-feature.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class AnalyzeDocumentQualityFeature extends ScanbotSdkFeatureComponent {
  override feature = {
    title: 'Document Quality Analyzer',
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

      const configuration = new DocumentQualityAnalyzerConfiguration();
      configuration.maxImageSize = 2100;

      // Configure other parameters as needed.

      const result = await ScanbotSDK.documentQualityAnalyzer(imageFileUri, configuration);

      await this.utils.dismissLoader();

      // Handle the result if a document is found.
      if (result.documentFound) {
        this.utils.showResultInfo(`Document Quality for selected image: ${result.quality}`);
      } else {
        this.utils.showWarningAlert('No document found.');
      }
    } catch (e: any) {
      await this.utils.dismissLoader();
      this.utils.showErrorAlert(e.message);
    }
  }
}
