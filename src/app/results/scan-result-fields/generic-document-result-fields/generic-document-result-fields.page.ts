import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ScanResultFieldsPage, ScanResultSection, } from '../scan-result-fields.page';

import { GenericDocument } from 'capacitor-plugin-scanbot-sdk';
import { Capacitor } from '@capacitor/core';

@Component({
    selector: 'app-generic-document-result-fields',
    templateUrl: '../scan-result-fields.page.html',
    styleUrls: ['../scan-result-fields.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
})
export class GenericDocumentResultFieldsPage extends ScanResultFieldsPage {
    override pageTitle: string = 'Generic Document Result';

    private recognizedDocumentsResult!: [GenericDocument];
    private imageResult!: string | null;

    constructor() {
        super();
    }

    override async ngOnInit() {
        this.recognizedDocumentsResult = JSON.parse(
            this.activatedRoute.snapshot.paramMap.get('documents') as string,
        );

        this.imageResult = this.activatedRoute.snapshot.paramMap.get('imageFileUri') as string;

        super.ngOnInit();
    }

    override loadResultFields(): Array<ScanResultSection> {
        let results: Array<ScanResultSection> = [];

        if (this.imageResult) {
            results.push({
                image: this.imageResult && Capacitor.convertFileSrc(this.imageResult)
            });
        }

        this.recognizedDocumentsResult.forEach((doc, index) => {
            results.push({
                title: this.recognizedDocumentsResult.length > 1 ? `Document #${index + 1}` : undefined,
                data: this.scanbotUtils.transformGenericDocument(doc)
            })
        });

        return results;
    }
}
