import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/utils/scanbot-utils';

import { MrzScannerResult, MrzScannerConfiguration, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-rtu-mrz-scanner-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class RtuMrzScannerFeature extends ScanbotSdkFeatureComponent {
    override feature = { id: FeatureId.ScanMRZ, title: 'Scan MRZ' };

    override async featureClicked() {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        const configuration: MrzScannerConfiguration = {
            // Customize colors, text resources, behavior, etc..
            finderTextHint: 'Please hold your phone over the 2- or 3-line MRZ code at the front of your passport.',
            orientationLockMode: 'PORTRAIT',
            // see further configs ...
        };

        try {
            const result = await ScanbotSDK.startMrzScanner(configuration);

            if (result.status === 'OK') {
                // Handle the extracted data
                const mrzResultAsJson = JSON.stringify(result);

                this.router.navigate([
                    '/mrz-result-fields',
                    mrzResultAsJson,
                ]);
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }
}
