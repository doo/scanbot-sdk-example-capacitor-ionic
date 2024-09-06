import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { Colors } from 'src/theme/theme';
import { FeatureId } from 'src/app/utils/scanbot-utils';

import { LicensePlateScannerConfiguration, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-rtu-license-plate-scanner-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class RtuLicensePlateScannerFeature extends ScanbotSdkFeatureComponent {
    override feature = {
        id: FeatureId.LicensePlateScanner,
        title: 'Scan Vehicle License Plate',
    };

    override async featureClicked() {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        const configuration: LicensePlateScannerConfiguration = {
            // Customize colors, text resources, behavior, etc..
            scanStrategy: 'ML_BASED',
            topBarBackgroundColor: Colors.scanbotRed,
            cancelButtonTitle: 'Cancel',
            finderLineColor: '#c8193c',
            finderLineWidth: 5,
            finderTextHint: 'Place the whole license plate in the frame to scan it',
            orientationLockMode: 'PORTRAIT',
            confirmationDialogConfirmButtonFilled: true,
            // see further configs...
        };

        try {
            const result = await ScanbotSDK.startLicensePlateScanner(configuration);

            if (result.status === 'OK') {
                // Handle the extracted data
                this.utils.showResultInfo(
                    `• License plate: ${result.licensePlate} <br />` +
                    `• Country code: ${result.countryCode} <br />` +
                    `• Confidence: ${result.confidence}%`);
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }
}
