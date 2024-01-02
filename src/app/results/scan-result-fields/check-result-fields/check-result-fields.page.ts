import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';

import {
    ScanResultFieldsSection,
    ScanResultFieldsPage,
    ScanResultField,
} from '../scan-result-fields.page';

import { CheckRecognizerResult } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-check-result-fields',
    templateUrl: '../scan-result-fields.page.html',
    styleUrls: ['../scan-result-fields.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
})
export class CheckResultFieldsPage extends ScanResultFieldsPage {
    override pageTitle: string = 'Check';

    private checkResult!: CheckRecognizerResult;

    constructor() {
        super();
    }

    override async ngOnInit() {
        this.checkResult = JSON.parse(
            this.activatedRoute.snapshot.paramMap.get('result') as string,
        );

        super.ngOnInit();
    }

    override loadResultFields(): ScanResultFieldsSection[] {
        let allFields: ScanResultFieldsSection[] = [];

        if (this.checkResult.imageFileUri) {
            const resultImageField: ScanResultField = {
                key: 'imageFileUri',
                fieldPhotoPreviewWebViewPath: Capacitor.convertFileSrc(
                    this.checkResult.imageFileUri,
                ),
                showPhotoOnly: true,
            };

            allFields = [
                { title: 'Snapped image', fields: [resultImageField] },
            ];
        }

        if (this.checkResult.fields) {
            const resultFields: ScanResultField[] = [];

            Object.entries(this.checkResult.fields).forEach(
                ([_key, _value]) => {
                    resultFields.push({
                        key: _key,
                        value: _value?.value?.text,
                    });
                },
            );

            allFields.push({ title: 'Fields', fields: resultFields });
        }

        return allFields;
    }
}
