import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/services/scanbot.service';

@Component({
    selector: 'app-rtu-batch-barcode-scanner-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class RtuBatchBarcodeScannerFeature extends ScanbotSdkFeatureComponent {
    override feature = {
        id: FeatureId.ScanBatchBarcodes,
        title: 'Scan Multiple QR-/Barcode',
    };

    override async run() {
        try {
            const barcodeResult = await this.scanbot.scanBatchBarcodes();

            if (barcodeResult.status === 'OK') {
                if (barcodeResult.barcodes) {
                    barcodeResult.barcodes.forEach((barcode) => {
                        this.utils.logBarcodeDocument(barcode);
                    });
                    this.utils.showResultInfo(
                        JSON.stringify(barcodeResult.barcodes),
                    );
                } else {
                    this.utils.showInfoAlert('No barcodes scanned');
                }
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }
}
