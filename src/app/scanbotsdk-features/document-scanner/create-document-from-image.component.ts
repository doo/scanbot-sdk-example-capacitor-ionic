import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Feature } from '../../utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature-component/scanbotsdk-feature.component';

import { CreateDocumentOptions, ScanbotDocument } from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-create-document-from-image',
  templateUrl: '../scanbotsdk-feature-component/scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature-component/scanbotsdk-feature.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class CreateDocumentFromGalleryComponent extends ScanbotSdkFeatureComponent {
  override feature: Feature = {
    title: 'Create Document from Image',
  };

  override async featureClicked(): Promise<void> {
    try {
      // Always make sure you have a valid license at runtime via ScanbotSDK.getLicenseInfo()
      if (!(await this.isLicenseValid())) {
        return;
      }

      // Select an image from the library
      const imageFileUri = await this.imageUtils.selectImageFromLibrary();
      if (!imageFileUri) {
        return;
      }

      await this.utils.showLoader();

      /** Create a document object */
      const options = new CreateDocumentOptions();
      options.documentDetection = true;

      let documentResult = await ScanbotDocument.createDocumentFromImages({
        images: [imageFileUri],
        options: options,
      });

      /** Handle the result if the result status is OK */
      this.router.navigate(['/document-result', documentResult.uuid]);
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    } finally {
      this.utils.dismissLoader();
    }
  }
}
