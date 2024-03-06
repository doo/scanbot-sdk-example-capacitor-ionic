import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {ScanResultSection, ScanResultSectionList, SectionListComponent} from "../section-list/section-list.component";
import {ScanResultFieldsPage} from "../scan-result-fields.page";
import {MrzScannerResult} from 'capacitor-plugin-scanbot-sdk';
import {GenericDocumentUtils} from "../../../utils/gdr-utils";

@Component({
  selector: 'app-mrz-result-fields',
    templateUrl: '../scan-result-fields.page.html',
    styleUrls: ['../scan-result-fields.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, SectionListComponent],
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

    override loadResultFields(): ScanResultSectionList {

        const commonSection: ScanResultSection = {
            title: 'MRZ Result',
            data: [
                GenericDocumentUtils.sectionValueItem('Document Type', this.mrzScannerResult.documentType),
                GenericDocumentUtils.sectionValueItem('Raw MRZ String', this.mrzScannerResult.rawString),
                GenericDocumentUtils.sectionValueItem(
                    'Recognition Successful',
                    this.mrzScannerResult.recognitionSuccessful ? 'YES' : 'NO',
                ),
                GenericDocumentUtils.sectionValueItem(
                    'Check digits count',
                    this.mrzScannerResult.checkDigitsCount.toString(),
                ),
                GenericDocumentUtils.sectionValueItem(
                    'Valid check digits count',
                    this.mrzScannerResult.validCheckDigitsCount.toString(),
                ),
                ...GenericDocumentUtils.gdrCommonFields(this.mrzScannerResult.mrz),
            ]
        };

        const checkFieldsSection: ScanResultSection = {
            title: 'MRZ Document',
            data: GenericDocumentUtils.gdrFields(this.mrzScannerResult.mrz),
        };

        return [
            commonSection,
            checkFieldsSection
        ];
    }

}
