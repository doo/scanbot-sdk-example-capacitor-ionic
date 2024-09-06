import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ScanResultFieldsPage, ScanResultSection, } from '../scan-result-fields.page';

import { MrzScannerResult } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-mrz-result-fields',
    templateUrl: '../scan-result-fields.page.html',
    styleUrls: ['../scan-result-fields.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
})
export class MrzResultFieldsPage extends ScanResultFieldsPage {
    override pageTitle: string = 'MRZ Scanner Result';

    private mrzScannerResult!: MrzScannerResult;

    constructor() {
        super();
    }

    override async ngOnInit() {
        this.mrzScannerResult = JSON.parse(
            this.activatedRoute.snapshot.paramMap.get('result') as string,
        );

        await super.ngOnInit();
    }

    override loadResultFields(): Array<ScanResultSection> {
        return [
            {
                data: [
                    { key: 'Successful Recognition', value: this.mrzScannerResult.recognitionSuccessful ? 'YES' : 'NO' },
                    { key: 'Document Type', value: this.mrzScannerResult.documentType },
                    { key: 'Raw MRZ String', value: this.mrzScannerResult.rawString },
                    { key: 'Check digits count', value: this.mrzScannerResult.checkDigitsCount.toString() },
                    { key: 'Valid check digits count', value: this.mrzScannerResult.validCheckDigitsCount.toString() }
                ]
            },
            {
                title: 'MRZ Document',
                data: this.scanbotUtils.transformGenericDocument(this.mrzScannerResult.mrz)
            }
        ];
    }
}
