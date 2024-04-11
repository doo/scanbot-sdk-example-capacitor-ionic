import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/utils/scanbot-utils';

import { HealthInsuranceCardScannerConfiguration, HealthInsuranceCardScannerResult, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-rtu-health-insurance-card-scanner-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class RtuHealthInsuranceCardScannerFeature extends ScanbotSdkFeatureComponent {
    override feature = {
        id: FeatureId.ScanEHIC,
        title: 'Scan Health Insurance Card',
    };

    override async featureClicked() {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        const configuration: HealthInsuranceCardScannerConfiguration = {
            // Customize colors, text resources, behavior, etc..
            finderLineColor: '#ff0000',
            finderTextHint: 'Please hold your phone over the back of your Health Insurance Card.',
            orientationLockMode: 'PORTRAIT',
            // see further configs ...
        };
        try {
            const result = await ScanbotSDK.startEHICScanner(configuration);

            if (result.status === 'CANCELED') {
                // User has canceled the scanning operation
            } else {
                // Handle the extracted data fields
                const fields = result.fields.map(
                    (f) => `${f.type}: ${f.value} (${f.confidence.toFixed(2)})`,
                );
                this.utils.showResultInfo(fields.join('\n'));
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }
}
