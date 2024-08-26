import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ScanResultFieldsPage, ScanResultSection } from '../scan-result-fields.page';

import { BarcodeScannerResult } from 'capacitor-plugin-scanbot-sdk/dist/esm/ui_v2';

@Component({
    selector: 'app-barcode-result-fields',
    templateUrl: '../scan-result-fields.page.html',
    styleUrls: ['../scan-result-fields.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
})
export class BarcodeResultFieldsPage extends ScanResultFieldsPage {
    override pageTitle: string = 'Barcode Result';

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

        this.barcodeResult.items.forEach((item, index) => {
            results.push(
                {
                    title: this.barcodeResult.items.length > 1 ? `Result #${index + 1}` : undefined
                },
                {
                    data: [
                        { key: 'Type', value: item.type ?? '/' },
                        { key: 'Count', value: item.count.toString() },
                        { key: 'Text', value: item.text },
                        { key: 'With Extension', value: item.textWithExtension },
                        { key: 'Raw bytes', value: item.rawBytes }
                    ]
                },
                {
                    subtitle: item.parsedDocument ? `Parsed Document: ${item.parsedDocument.type.name}` : undefined,
                    data: item.parsedDocument ? this.scanbotUtils.transformGenericDocument(item.parsedDocument, true) : undefined
                })
        });

        return results;
    }
}
