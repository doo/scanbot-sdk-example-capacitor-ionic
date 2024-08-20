import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { Colors } from 'src/theme/theme';
import { FeatureId } from 'src/app/utils/scanbot-utils';

import { DocumentScannerConfiguration, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-rtu-document-scanner-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class RtuDocumentScannerFeature extends ScanbotSdkFeatureComponent {
    override feature = {
        id: FeatureId.DocumentScanner,
        title: 'Scan Document',
    };

    override async featureClicked() {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        const configuration: DocumentScannerConfiguration = {
            // Customize colors, text resources, behavior, etc..
            polygonColor: '#00ffff',
            bottomBarBackgroundColor: Colors.scanbotRed,
            topBarBackgroundColor: Colors.scanbotRed,
            cameraBackgroundColor: Colors.scanbotRed,
            orientationLockMode: 'PORTRAIT',
            pageCounterButtonTitle: '%d Page(s)',
            multiPageEnabled: false,
            ignoreBadAspectRatio: true,
            // see further configs ...
        };

        try {
            const documentResult = await ScanbotSDK.startDocumentScanner(configuration);

            if (documentResult.status === 'CANCELED') {
                // User has canceled the scanning operation
            } else {
                // Handle the scanned pages from result
                await this.preferencesUtils.savePages(documentResult.pages);
                this.router.navigate(['/page-results']);
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }
}
