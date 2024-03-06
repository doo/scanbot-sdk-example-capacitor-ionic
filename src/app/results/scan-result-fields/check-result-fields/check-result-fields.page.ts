import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';


import {
    ScanResultFieldsPage,
} from '../scan-result-fields.page';

import {CheckRecognizerResult} from 'capacitor-plugin-scanbot-sdk';
import {ScanResultSection, ScanResultSectionList, SectionListComponent} from "../section-list/section-list.component";
import {GenericDocumentUtils} from "../../../utils/gdr-utils";
import {Capacitor} from "@capacitor/core";

@Component({
    selector: 'app-check-result-fields',
    templateUrl: '../scan-result-fields.page.html',
    styleUrls: ['../scan-result-fields.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, SectionListComponent],
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

    override loadResultFields(): ScanResultSectionList {
        const commonSection: ScanResultSection = {
            title: 'Check Result',
            data: [
                {
                    key: 'Check Image',
                    image: this.checkResult.imageFileUri && Capacitor.convertFileSrc(this.checkResult.imageFileUri),
                },
                {
                    key: 'Recognition Status',
                    value: this.checkResult.checkStatus,
                },
                {
                    key: 'Check Type',
                    value: this.checkResult.checkType,
                },
                {
                    key: 'Recognition confidence',
                    value: this.checkResult.check.confidence.toString(),
                },
            ]
        };

        const checkFieldsSection: ScanResultSection = {
            title: this.checkResult.check.type.name,
            data: GenericDocumentUtils.gdrFields(this.checkResult.check),
        };

        return [
            commonSection,
            checkFieldsSection
        ];
    }
}
