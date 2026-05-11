import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ScanbotSdkFeatureComponent } from './scanbotsdk-feature-component/scanbotsdk-feature.component';
import { Feature } from '../utils/scanbot-utils';

import {
  AspectRatio,
  autorelease,
  DocumentStraighteningParameters,
  ScanbotDocumentEnhancer,
} from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-document-straightener',
  templateUrl: './scanbotsdk-feature-component/scanbotsdk-feature.component.html',
  styleUrls: ['./scanbotsdk-feature-component/scanbotsdk-feature.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class DocumentStraightenerFeatureComponent extends ScanbotSdkFeatureComponent {
  override feature: Feature = {
    title: 'Document Straightener',
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

      /**
       * Note: The result of straightenImage contains an ImageRef, thus
       * the autorelease block must be used to properly dispose of the ImageRef.
       */
      await autorelease(async () => {
        /**
         * The straightening parameters can be customized to fit the expected
         * aspect ratio of the document to be straightened. This can help the straightening
         * algorithm to achieve better results. In this example, the expected aspect ratio of the
         * document is 5:7.
         */
        const straighteningParameters = new DocumentStraighteningParameters();
        straighteningParameters.straighteningMode = 'STRAIGHTEN';
        straighteningParameters.aspectRatios = [new AspectRatio({ width: 5, height: 7 })];

        const result = await ScanbotDocumentEnhancer.straightenImage({
          image: imageFileUri,
          straighteningParameters: straighteningParameters,
        });

        if (!result.straightenedImage) {
          throw Error('Straightening failed. The result does not contain a straightened image.');
        }

        const straightenedImage = await result.straightenedImage.encodeImage();
        if (!straightenedImage) {
          throw Error('Encoding failed.');
        }

        this.router.navigate(['/image-result', straightenedImage]);
      });
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    } finally {
      await this.utils.dismissLoader();
    }
  }
}
