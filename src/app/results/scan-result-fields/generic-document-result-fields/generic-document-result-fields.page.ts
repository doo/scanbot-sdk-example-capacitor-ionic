import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ScanResultFieldsPage, } from '../scan-result-fields.page';
import { ScanResultSection, ScanResultSectionList, SectionListComponent } from "../section-list/section-list.component";
import { GenericDocumentUtils } from "../../../utils/gdr-utils";

import {
    CategoriesDocument,
    DeDriverLicenseBackDocument,
    DeDriverLicenseFrontDocument,
    DeIdCardBackDocument,
    DeIdCardFrontDocument,
    DePassportDocument,
    Field,
    GenericDocumentRecognizerResult
} from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-generic-document-result-fields',
    templateUrl: '../scan-result-fields.page.html',
    styleUrls: ['../scan-result-fields.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, SectionListComponent],
})
export class GenericDocumentResultFieldsPage extends ScanResultFieldsPage {
    override pageTitle: string = 'Generic Document Result';
    private genericDocumentResult!: GenericDocumentRecognizerResult;

    constructor() {
        super();
    }

    override async ngOnInit() {
        this.genericDocumentResult = JSON.parse(
            this.activatedRoute.snapshot.paramMap.get('result') as string,
        );

        super.ngOnInit();
    }

    override loadResultFields(): ScanResultSectionList {
        return this.genericDocumentResult.documents
            .flatMap(document => {
                switch (document.type.name) {
                    case 'DeDriverLicenseBack':
                        return this.deDriverLicenseBackFields(
                            document as DeDriverLicenseBackDocument,
                        );
                    case 'DeDriverLicenseFront':
                        return this.deDriverLicenseFrontFields(
                            document as DeDriverLicenseFrontDocument,
                        );
                    case 'DeIdCardBack':
                        return this.deIdCardBackFields(document as DeIdCardBackDocument);
                    case 'DeIdCardFront':
                        return this.deIdCardFrontFields(document as DeIdCardFrontDocument);
                    case 'DePassport':
                        return this.dePassportFields(document as DePassportDocument);
                    default:
                        return [];
                }
            })
    }

    // German Passport - Display Utility Method
    private dePassportFields = (
        passportDocument: DePassportDocument,
    ): ScanResultSection[] => [
            {
                title: 'German Passport',
                data: [
                    ...GenericDocumentUtils.gdrCommonFields(passportDocument),
                    ...GenericDocumentUtils.gdrFields(passportDocument),
                ],
            },
            {
                title: 'Passport MRZ',
                data: [
                    ...GenericDocumentUtils.gdrCommonFields(passportDocument.mrz),
                    ...GenericDocumentUtils.gdrFields(passportDocument.mrz),
                ],
            },
        ];

    // German ID Card (FRONT) - Display Utility Method
    private deIdCardFrontFields = (idCardDocument: DeIdCardFrontDocument) => [
        {
            title: 'German ID Card Front',
            data: [
                ...GenericDocumentUtils.gdrCommonFields(idCardDocument),
                ...GenericDocumentUtils.gdrFields(idCardDocument),
            ],
        },
    ];

    // German ID Card (BACK) - Display Utility Method
    private deIdCardBackFields = (idCardDocument: DeIdCardBackDocument) => [
        {
            title: 'German ID Card Back',
            data: [
                ...GenericDocumentUtils.gdrCommonFields(idCardDocument),
                ...GenericDocumentUtils.gdrFields(idCardDocument),
            ],
        },
        {
            title: 'ID Card MRZ',
            data: [
                ...GenericDocumentUtils.gdrCommonFields(idCardDocument.mrz),
                ...GenericDocumentUtils.gdrFields(idCardDocument.mrz),
            ],
        },
    ];

    // Driver License (FRONT) - Display Utility Method
    private deDriverLicenseFrontFields = (
        driversLicense: DeDriverLicenseFrontDocument,
    ) => [
            {
                title: 'German Drivers licence Front',
                data: [
                    ...GenericDocumentUtils.gdrCommonFields(driversLicense),
                    ...GenericDocumentUtils.gdrFields(driversLicense),
                ],
            },
        ];

    // Driver License (BACK) - Display Utility Method
    private deDriverLicenseBackFields = (
        driversLicense: DeDriverLicenseBackDocument,
    ) => [
            {
                title: 'German Drivers licence Back',
                data: [
                    ...GenericDocumentUtils.gdrCommonFields(driversLicense),
                    ...GenericDocumentUtils.gdrFields(driversLicense),
                ],
            },
            ...this.driverLicenseBackCategoryFields(driversLicense.categories),
        ];

    // Driver License (BACK - Categories) - Display Utility Method
    private driverLicenseBackCategoryFields = (categories: CategoriesDocument) => [
        this.getDriverLicenseCategoryField('A', categories.a),
        this.getDriverLicenseCategoryField('A1', categories.a1),
        this.getDriverLicenseCategoryField('A2', categories.a2),
        this.getDriverLicenseCategoryField('B', categories.b),
        this.getDriverLicenseCategoryField('B1', categories.b1),
        this.getDriverLicenseCategoryField('BE', categories.be),
        this.getDriverLicenseCategoryField('C', categories.c),
        this.getDriverLicenseCategoryField('C1', categories.c1),
        this.getDriverLicenseCategoryField('C1E', categories.c1e),
        this.getDriverLicenseCategoryField('CE', categories.ce),
        this.getDriverLicenseCategoryField('D', categories.d),
        this.getDriverLicenseCategoryField('D1', categories.d1),
        this.getDriverLicenseCategoryField('D1E', categories.d1e),
        this.getDriverLicenseCategoryField('DE', categories.de),
        this.getDriverLicenseCategoryField('L', categories.l),
        this.getDriverLicenseCategoryField('M', categories.m),
        this.getDriverLicenseCategoryField('T', categories.t),
    ];

    // Driver License Category - Display Utility Method
    private getDriverLicenseCategoryField = (
        displayName: string,
        category?: {
            validFrom: Field;
            validUntil: Field;
        },
    ) => {
        if (category === undefined) {
            return {
                title: displayName,
                data: [],
            };
        }

        const from = category?.validFrom.value?.text ?? 'N/A';
        const until = category?.validUntil.value?.text ?? 'N/A';

        return {
            title: displayName,
            data: [
                {
                    key: displayName,
                    value: `From ${from} to ${until}`,
                },
            ],
        };
    };

}
