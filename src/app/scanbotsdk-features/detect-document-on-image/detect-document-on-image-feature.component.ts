import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/utils/scanbot-utils';

import { ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-detect-document-on-image-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class DetectDocumentOnImageFeature extends ScanbotSdkFeatureComponent {
    override feature = {
        id: FeatureId.DetectDocumentFromImage,
        title: 'Import Image & Detect Document (JSON)',
    };

    override async featureClicked() {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        try {
            // Select image from the library
            const imageFileUri = await this.imageUtils.selectImageFromLibrary();
            await this.utils.showLoader();

            const result = await ScanbotSDK.detectDocument({ imageFileUri: imageFileUri });
            const qualityResult = await ScanbotSDK.documentQualityAnalyzer({ imageFileUri: imageFileUri });

            await this.utils.dismissLoader();
            this.utils.showResultInfo(
                `Detected Document result: ${JSON.stringify(result, null, 2)}\n` +
                `Document Quality result: ${JSON.stringify(qualityResult, null, 2)}`,
            );

        } catch (e: any) {
            await this.utils.dismissLoader();
            this.utils.showErrorAlert(e.message);
        }
    }
}
