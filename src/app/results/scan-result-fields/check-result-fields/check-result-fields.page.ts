import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ScanResultFieldsPage, ScanResultSection } from '../scan-result-fields.page';

import { CheckRecognizerResult } from 'capacitor-plugin-scanbot-sdk';
import { Capacitor } from '@capacitor/core';

@Component({
    selector: 'app-check-result-fields',
    templateUrl: '../scan-result-fields.page.html',
    styleUrls: ['../scan-result-fields.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
})
export class CheckResultFieldsPage extends ScanResultFieldsPage {
    override pageTitle: string = 'Check Result';

    private checkResult!: CheckRecognizerResult;

    constructor() {
        super();
    }

    override async ngOnInit() {
        this.checkResult = JSON.parse(
            this.activatedRoute.snapshot.paramMap.get('result') as string,
        );

        await super.ngOnInit();
    }

    override loadResultFields(): Array<ScanResultSection> {
        return [
            {
                image: this.checkResult.imageFileUri && Capacitor.convertFileSrc(this.checkResult.imageFileUri)
            },
            {
                data: [
                    { key: 'Recognition Status', value: this.checkResult.checkStatus }
                ]
            },
            {
                title: 'Check Document',
                data: this.scanbotUtils.transformGenericDocument(this.checkResult.check, true)
            }
        ];
    }
}
