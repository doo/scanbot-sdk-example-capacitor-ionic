import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';

import { BarcodeScannerConfiguration, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';
import { FeatureId } from 'src/app/utils/scanbot-utils';

@Component({
    selector: 'app-rtu-barcode-scanner-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class RtuBarcodeScannerFeature extends ScanbotSdkFeatureComponent {
    override feature = {
        id: FeatureId.ScanBarcodes,
        title: 'Scan QR-/Barcode',
    };

    override async featureClicked() {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        const configuration: BarcodeScannerConfiguration = {
            // Customize colors, text resources, behavior, etc..
            finderTextHint: 'Please align the barcode or QR code in the frame above to scan it.',
            orientationLockMode: 'PORTRAIT',
            finderLineColor: '#0000ff',
            barcodeFormats: await this.scanbotUtils.getAcceptedBarcodeFormats(), // optional filter for specific barcode types
            acceptedDocumentFormats:
                (await this.scanbotUtils.isBarcodeDocumentFormatsEnabled())
                    ? await this.scanbotUtils.getAcceptedBarcodeDocumentFormats()
                    : [], // optional filter for specific document types
            finderAspectRatio: { width: 1, height: 1 },
            useButtonsAllCaps: false,
            barcodeImageGenerationType: 'NONE',
            // see further configs ...
        };

        try {
            const barcodeResult = await ScanbotSDK.startBarcodeScanner(configuration);

            if (barcodeResult.status === 'CANCELED') {
                // User has canceled the scanning operation
            } else if (barcodeResult.barcodes) {
                // Handle the scanned barcode(s) from result
                this.utils.logBarcodeDocument(barcodeResult.barcodes[0]);
                this.utils.showResultInfo(JSON.stringify(barcodeResult.barcodes),);
            } else {
                this.utils.showInfoAlert('No barcodes scanned');
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }
}
