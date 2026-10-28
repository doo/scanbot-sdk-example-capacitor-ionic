import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature-component/scanbotsdk-feature.component';
import { Feature } from '../../utils/scanbot-utils';
import {
  DocumentCleanupStandaloneConfiguration,
  ScanbotDocument,
  ScanbotDocumentEnhancer,
} from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-rtu-document-cleanup',
  templateUrl: '../scanbotsdk-feature-component/scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature-component/scanbotsdk-feature.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class RtuDocumentCleanupFeatureComponent extends ScanbotSdkFeatureComponent {
  override feature: Feature = {
    title: 'Document Cleanup',
  };

  override async featureClicked(): Promise<void> {
    try {
      // Always make sure you have a valid license at runtime via ScanbotSDK.getLicenseInfo()
      if (!(await this.isLicenseValid())) {
        return;
      }

      // Select an image from the library
      const selectedImageResult = await this.imageUtils.selectImageFromLibrary();
      if (!selectedImageResult) {
        return;
      }

      /**
       * Create a document object from the selected image
       */
      const document = await ScanbotDocument.createDocumentFromImages({
        images: [selectedImageResult],
      });
      /*
       * Create a document cleanup configuration object and
       * start the document cleanup screen with the configuration
       */
      const configuration = new DocumentCleanupStandaloneConfiguration({
        documentUuid: document.uuid,
        pageUuid: document.pages[0].uuid,
      });
      /*
       * Configure the cleanup screen
       */
      configuration.cleanup.topBarConfirmButton.text = 'Submit';

      const cleanedUpDocument =
        await ScanbotDocumentEnhancer.startDocumentCleanupScreen(configuration);
      /**
       * Handle the result if the result status is OK
       */
      if (cleanedUpDocument.status === 'OK') {
        this.router.navigate(['/document-result', cleanedUpDocument.data.uuid]);
      }
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }
}
