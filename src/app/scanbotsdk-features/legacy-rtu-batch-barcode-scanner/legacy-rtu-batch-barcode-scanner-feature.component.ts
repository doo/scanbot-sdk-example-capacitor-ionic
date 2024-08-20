import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/utils/scanbot-utils';
import { Colors } from 'src/theme/theme';

import { BatchBarcodeScannerConfiguration, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-legacy-rtu-batch-barcode-scanner-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class LegacyRtuBatchBarcodeScannerFeature extends ScanbotSdkFeatureComponent {
    override feature = {
        id: FeatureId.LegacyScanBatchBarcodes,
        title: 'Scan Multiple QR-/Barcodes',
    };

    override async featureClicked() {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        const configuration: BatchBarcodeScannerConfiguration = {
            // Customize colors, text resources, behavior, etc..
            finderTextHint: 'Please align the barcode or QR code in the frame above to scan it.',
            orientationLockMode: 'PORTRAIT',
            finderLineColor: Colors.scanbotRed,
            barcodeFormats: await this.scanbotUtils.getAcceptedBarcodeFormats(), // optional filter for specific barcode types
            acceptedDocumentFormats: await this.scanbotUtils.getAcceptedBarcodeDocumentFormats(), // optional filter for specific document types
            finderAspectRatio: { width: 1, height: 1 },
            useButtonsAllCaps: false,
            // see further configs ...
        }

        try {
            const result = await ScanbotSDK.startBatchBarcodeScanner(configuration);

            if (result.status === 'CANCELED') {
                // User has canceled the scanning operation
            } else if (result.barcodes) {
                // Handle the scanned barcode(s) from result
                this.router.navigate([
                    '/legacy-barcode-result-fields',
                    JSON.stringify(result),
                ]);
            } else {
                this.utils.showInfoAlert('No barcodes scanned');
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }
}
