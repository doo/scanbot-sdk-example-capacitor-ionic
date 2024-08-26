import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { Colors } from 'src/theme/theme';
import { FeatureId } from 'src/app/utils/scanbot-utils';

import { FinderDocumentScannerConfiguration, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-rtu-document-scanner-with-finder-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class RtuDocumentScannerWithFinderFeature extends ScanbotSdkFeatureComponent {
    override feature = {
        id: FeatureId.FinderDocumentScanner,
        title: 'Scan Document with Finder',
    };

    override async featureClicked() {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        const configuration: FinderDocumentScannerConfiguration = {
            // Customize colors, text resources, behavior, etc..
            topBarBackgroundColor: Colors.scanbotRed,
            cameraBackgroundColor: Colors.scanbotRed,
            orientationLockMode: 'PORTRAIT',
            ignoreBadAspectRatio: true,
            finderLineColor: Colors.scanbotRed,
            // see further configs ...
        };

        try {
            const documentResult = await ScanbotSDK.startFinderDocumentScanner(configuration);

            if (documentResult.status === 'OK' && documentResult.pages.length > 0) {
                // Handle the scanned pages from result
                await this.preferencesUtils.savePages(documentResult.pages);
                this.router.navigate(['/page-results']);
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }
}
