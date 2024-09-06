import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { Feature, FeatureId } from 'src/app/utils/scanbot-utils';

import { ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-recognize-generic-document-on-image-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class RecognizeGenericDocumentOnImageFeature extends ScanbotSdkFeatureComponent {
    override feature: Feature = {
        id: FeatureId.RecognizeGenericDocumentOnImage,
        title: 'Recognize Generic Document on Image',
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

            const result = await ScanbotSDK.recognizeGenericDocument({
                imageFileUri: imageFileUri,
            });

            this.utils.dismissLoader();
            if (result.status === "OK" && result.document) {
                // Handle the extracted data
                const recognizedDocumentAsJson = JSON.stringify([result.document]);

                this.router.navigate([
                    '/generic-document-result-fields',
                    recognizedDocumentAsJson,
                    result.imageFileUri ?? ''
                ]);
            } else {
                this.utils.showInfoAlert('No document recognized');
            }
        } catch (e: any) {
            await this.utils.dismissLoader();
            this.utils.showErrorAlert(e.message);
        }
    }
}
