import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { Feature, FeatureId } from 'src/app/utils/scanbot-utils';

import { ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-recognize-medical-certificate-on-image-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class RecognizeMedicalCertificateOnImageFeature extends ScanbotSdkFeatureComponent {
    override feature: Feature = {
        id: FeatureId.RecognizeMedicalCertificateOnImage,
        title: 'Recognize Medical Certificate on Image',
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

            const result = await ScanbotSDK.recognizeMedicalCertificate({
                imageFileUri: imageFileUri,
            });

            this.utils.dismissLoader();
            if (result.status === "OK") {
                // Handle the extracted data
                const medicalCertResultAsJson = JSON.stringify(result);

                this.router.navigate([
                    '/medical-certificate-result-fields',
                    medicalCertResultAsJson,
                ]);
            } else {
                this.utils.showInfoAlert('No Medical Certificate found');
            }
        } catch (e: any) {
            await this.utils.dismissLoader();
            this.utils.showErrorAlert(e.message);
        }
    }
}
