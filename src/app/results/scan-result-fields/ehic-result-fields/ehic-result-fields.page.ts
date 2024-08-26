import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ScanResultFieldsPage, ScanResultSection, ScanResultSectionData, } from '../scan-result-fields.page';

import { HealthInsuranceCardScannerResult } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-ehic-result-fields',
    templateUrl: '../scan-result-fields.page.html',
    styleUrls: ['../scan-result-fields.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
})
export class EHICResultFieldsPage extends ScanResultFieldsPage {
    override pageTitle: string = 'EHIC Result';

    private ehicResult!: HealthInsuranceCardScannerResult;

    constructor() {
        super();
    }

    override async ngOnInit() {
        this.ehicResult = JSON.parse(
            this.activatedRoute.snapshot.paramMap.get('result') as string,
        );

        super.ngOnInit();
    }

    override loadResultFields(): Array<ScanResultSection> {
        return [
            {
                data: [
                    { key: 'Detection Status', value: this.ehicResult.detectionStatus },
                    ...this.transformEHICFields()
                ]
            }
        ];
    }

    private transformEHICFields(): Array<ScanResultSectionData> {

        return this.ehicResult.fields
            .map(field => {
                let value = field.value

                if (value !== '') {
                    value += ` (confidence:${Math.round(field.confidence * 100)}%)`
                } else {
                    value = '/'
                }

                return {
                    key: field.type,
                    value: value,
                } as ScanResultSectionData;
            });
    }
}
