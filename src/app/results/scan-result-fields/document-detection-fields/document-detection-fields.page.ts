import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ScanResultFieldsPage, ScanResultSection, } from '../scan-result-fields.page';

import { DetectDocumentResult, } from 'capacitor-plugin-scanbot-sdk';
import { Capacitor } from '@capacitor/core';

@Component({
    selector: 'app-document-detection-fields',
    templateUrl: '../scan-result-fields.page.html',
    styleUrls: ['../scan-result-fields.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
})
export class DocumentDetectionFieldsPage extends ScanResultFieldsPage {
    override pageTitle: string = 'Document Detection Result';

    private documentDetectionResult!: DetectDocumentResult;

    constructor() {
        super();
    }

    override async ngOnInit() {
        this.documentDetectionResult = JSON.parse(
            this.activatedRoute.snapshot.paramMap.get('result') as string,
        );

        await super.ngOnInit();
    }

    override loadResultFields(): Array<ScanResultSection> {
        return [
            {
                image: this.documentDetectionResult.documentImageFileUri && Capacitor.convertFileSrc(this.documentDetectionResult.documentImageFileUri)
            },
            {
                data: [
                    { key: 'Detection Result', value: this.documentDetectionResult.detectionResult },
                    {
                        key: 'Polygon',
                        value: `${this.documentDetectionResult.polygon.map((point) =>
                            `\n{ "x": ${point.x} , "y": ${point.y} }`
                        ).toString()}`
                    }
                ]
            }
        ];
    }
}
