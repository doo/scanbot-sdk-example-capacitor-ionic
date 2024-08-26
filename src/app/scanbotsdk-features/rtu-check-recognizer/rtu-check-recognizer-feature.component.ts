import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { Colors } from 'src/theme/theme';
import { FeatureId } from 'src/app/utils/scanbot-utils';

import { CheckRecognizerConfiguration, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-rtu-check-recognizer-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class RtuCheckRecognizerFeature extends ScanbotSdkFeatureComponent {
    override feature = { id: FeatureId.CheckRecognizer, title: 'Scan Check' };

    override async featureClicked() {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        const configuration: CheckRecognizerConfiguration = {
            // Customize colors, text resources, behavior, etc..
            enableCameraButtonTitle: 'Enable Camera',
            orientationLockMode: 'PORTRAIT',
            topBarBackgroundColor: Colors.scanbotRed,
            // see further configs ...
        };

        try {
            const result = await ScanbotSDK.startCheckRecognizer(configuration);

            if (result.status === 'OK') {
                // Handle the extracted data
                const checkResultAsJson = JSON.stringify(result);

                this.router.navigate([
                    '/check-result-fields',
                    checkResultAsJson,
                ]);
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }
}
