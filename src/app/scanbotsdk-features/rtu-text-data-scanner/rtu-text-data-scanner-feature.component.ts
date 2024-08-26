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
        title: 'Scan Text Data',
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
            const textData = await ScanbotSDK.startTextDataScanner(configuration);

            if (textData.status === 'OK') {
                // Handle the extracted data
                this.utils.showResultInfo(
                    `• Text: ${textData.result.text} <br />` +
                    `• Confidence: ${Math.round(textData.result.confidence * 100)}%`);
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }
}
