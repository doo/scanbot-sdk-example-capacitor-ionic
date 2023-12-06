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

import {
    MedicalCertificateCheckboxField,
    MedicalCertificateDateField,
    MedicalCertificateScannerResult,
} from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-medical-certificate-result-fields',
    templateUrl: '../scan-result-fields.page.html',
    styleUrls: ['../scan-result-fields.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
})
export class MedicalCertificateResultFieldsPage extends ScanResultFieldsPage {
    override pageTitle: string = 'Medical Certificate';

    private medicalCertResult!: MedicalCertificateScannerResult;

    constructor() {
        super();
    }

    override async ngOnInit() {
        this.medicalCertResult = JSON.parse(
            this.activatedRoute.snapshot.paramMap.get('result') as string,
        );

        super.ngOnInit();
    }

    override loadResultFields(): ScanResultFieldsSection[] {
        let allFields: ScanResultFieldsSection[] = [];

        if (this.medicalCertResult.imageFileUri) {
            const resultImageField: ScanResultField = {
                key: 'imageFileUri',
                fieldPhotoPreviewWebViewPath: Capacitor.convertFileSrc(
                    this.medicalCertResult.imageFileUri,
                ),
                showPhotoOnly: true,
            };

            allFields = [
                { title: 'Snapped image', fields: [resultImageField] },
            ];
        }

        allFields.push({
            title: 'Patient Data',
            fields: this.getPatientData(),
        });
        allFields.push({ title: 'Dates', fields: this.getDates() });
        allFields.push({ title: 'Checkboxes', fields: this.getCheckboxes() });

        return allFields;
    }

    private getPatientData(): ScanResultField[] {
        const patientDataResultFields: ScanResultField[] = [];

        Object.entries(this.medicalCertResult.patientData).forEach(
            ([_key, _value]) => {
                patientDataResultFields.push({
                    key: _key,
                    value: _value as string,
                });
            },
        );

        return patientDataResultFields;
    }

    private getDates(): ScanResultField[] {
        const datesResultFields: ScanResultField[] = [];

        Object.entries(this.medicalCertResult.dates).forEach(
            ([_key, _value]) => {
                const dateResultField: ScanResultField = { key: _key };

                if (_value) {
                    const dateField = _value as MedicalCertificateDateField;
                    dateResultField.value = `${dateField.dateString
                        } (confidence: ${Math.round(
                            dateField.recognitionConfidence * 100,
                        )}%)`;
                }

                datesResultFields.push(dateResultField);
            },
        );

        return datesResultFields;
    }

    private getCheckboxes(): ScanResultField[] {
        const checkboxesResultFields: ScanResultField[] = [];

        Object.entries(this.medicalCertResult.checkboxes).forEach(
            ([_key, _value]) => {
                const checkboxResultField: ScanResultField = { key: _key };

                if (_value) {
                    const checkboxField =
                        _value as MedicalCertificateCheckboxField;
                    checkboxResultField.value = `${checkboxField.isChecked ? 'YES' : 'NO'
                        } (confidence: ${Math.round(
                            checkboxField.confidence * 100,
                        )}%)`;
                }

                checkboxesResultFields.push(checkboxResultField);
            },
        );

        return checkboxesResultFields;
    }
}
