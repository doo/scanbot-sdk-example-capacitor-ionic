import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ScanResultFieldsPage, ScanResultSection } from '../scan-result-fields.page';

import { BarcodeScannerResult } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-legacy-barcode-result-fields',
    templateUrl: '../scan-result-fields.page.html',
    styleUrls: ['../scan-result-fields.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
})
export class LegacyBarcodeResultFieldsPage extends ScanResultFieldsPage {
    override pageTitle: string = 'Legacy Barcode Result';

    private barcodeResult!: BarcodeScannerResult;

    constructor() {
        super();
    }

    override async ngOnInit() {
        this.barcodeResult = JSON.parse(
            this.activatedRoute.snapshot.paramMap.get('result') as string,
        );

        await super.ngOnInit();
    }

    override loadResultFields(): Array<ScanResultSection> {
        let results: Array<ScanResultSection> = [];

        this.barcodeResult.barcodes?.forEach((barcodeItem, index) => {
            results.push(
                {
                    title: this.barcodeResult.barcodes!.length > 1 ? `Result #${index + 1}` : undefined
                },
                {
                    data: [
                        { key: 'Type', value: barcodeItem.type ?? '/' },
                        { key: 'Text', value: barcodeItem.text },
                        { key: 'With Extension', value: barcodeItem.textWithExtension },
                        { key: 'Raw bytes', value: `[${barcodeItem.rawBytes.toString()}]` }
                    ]
                },
                {
                    subtitle: barcodeItem.formattedResult ? `Parsed Document: ${barcodeItem.formattedResult.type.name}` : undefined,
                    data: barcodeItem.formattedResult ? this.scanbotUtils.transformGenericDocument(barcodeItem.formattedResult, true) : undefined
                })
        });

        return results;
    }
}
