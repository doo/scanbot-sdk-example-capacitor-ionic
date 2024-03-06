import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { Feature, FeatureId } from 'src/app/utils/scanbot-utils';
import { Colors } from 'src/theme/theme';

import { ScanbotSDK, TextDataScannerConfiguration } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-rtu-text-data-scanner-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class RtuTextDataScannerFeature extends ScanbotSdkFeatureComponent {
    override feature: Feature = {
        id: FeatureId.TextDataScanner,
        title: 'Start Text Data Scanner',
    };

    override async featureClicked() {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        const configuration: TextDataScannerConfiguration = {
            topBarBackgroundColor: Colors.scanbotRed,
            textDataScannerStep: {
                allowedSymbols: '',
                aspectRatio: {
                    height: 1.0,
                    width: 5.0,
                },
                guidanceText: 'Place the text in the frame to scan it',
                pattern: '',
                preferredZoom: 2.0,
                shouldMatchSubstring: false,
                significantShakeDelay: -1,
                unzoomedFinderHeight: 40,
            },
            // Other UI configs...
        };

        try {
            const result = await ScanbotSDK.startTextDataScanner(configuration);

            if (result.status === 'CANCELED') {
                // User has canceled the scanning operation
            } else if (result.result?.text) {
                // Handle the extracted data
                this.utils.showResultInfo(JSON.stringify(result));
            } else {
                this.utils.showInfoAlert('No text data found');
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }
}
