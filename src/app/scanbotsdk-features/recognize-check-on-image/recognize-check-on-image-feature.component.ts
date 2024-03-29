import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { Feature, FeatureId } from 'src/app/utils/scanbot-utils';

import { ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-recognize-check-on-image-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class RecognizeCheckOnImageFeature extends ScanbotSdkFeatureComponent {
    override feature: Feature = {
        id: FeatureId.RecognizeCheckOnImage,
        title: 'Import Image and Recognize Check',
    };

    override async featureClicked() {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        try {
            const imageFileUri = await this.imageUtils.selectImageFromLibrary()
            await this.utils.showLoader();

            const result = await ScanbotSDK.recognizeCheck({
                imageFileUri: imageFileUri,
            });

            this.utils.dismissLoader();
            if (result.checkStatus === 'SUCCESS') {
                // Handle the detected check(s) from result
                const checkResultAsJson = JSON.stringify(result);

                console.log(checkResultAsJson);
                this.router.navigate([
                    '/check-result-fields',
                    checkResultAsJson,
                ]);
            } else {
                this.utils.showInfoAlert('The check was not found in the given image.');
            }
        } catch (e: any) {
            await this.utils.dismissLoader();
            this.utils.showErrorAlert(e.message);
        }
    }
}
