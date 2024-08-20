import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Capacitor } from "@capacitor/core";

import { ScanResultFieldsPage, ScanResultSection, ScanResultSectionData, } from '../scan-result-fields.page';

import { MedicalCertificateCheckboxField, MedicalCertificateDateField, MedicalCertificatePatientDataInfoField, MedicalCertificateScannerResult, } from 'capacitor-plugin-scanbot-sdk';

type PatientDataKeys = keyof MedicalCertificateScannerResult['patientData'];
type DatesKeys = keyof MedicalCertificateScannerResult['dates'];
type CheckBoxKeys = keyof MedicalCertificateScannerResult['checkboxes'];

@Component({
    selector: 'app-medical-certificate-result-fields',
    templateUrl: '../scan-result-fields.page.html',
    styleUrls: ['../scan-result-fields.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
})
export class MedicalCertificateResultFieldsPage extends ScanResultFieldsPage {
    override pageTitle: string = 'Medical Certificate Result';

    private medicalCertificateScannerResult!: MedicalCertificateScannerResult;

    constructor() {
        super();
    }

    override async ngOnInit() {
        this.medicalCertificateScannerResult = JSON.parse(
            this.activatedRoute.snapshot.paramMap.get('result') as string,
        );

        await super.ngOnInit();
    }

    override loadResultFields(): Array<ScanResultSection> {
        let resultFields: Array<ScanResultSection> = [
            {
                image: this.medicalCertificateScannerResult.imageFileUri && Capacitor.convertFileSrc(this.medicalCertificateScannerResult.imageFileUri)
            },
            {
                data: [
                    { key: 'Form Type', value: this.medicalCertificateScannerResult.formType }
                ]
            }
        ];

        const patientData = this.transformPatientData();
        if (patientData.length > 0) {
            resultFields.push({
                title: 'Patient Data',
                data: this.transformPatientData()
            });
        }

        const dates = this.transformDates()
        if (dates.length > 0) {
            resultFields.push({
                title: 'Dates',
                data: this.transformDates()
            });
        }

        const checkboxes = this.transformCheckboxes();
        if (checkboxes.length > 0) {
            resultFields.push({
                title: 'Checkboxes',
                data: this.transformCheckboxes()
            });
        }

        return resultFields;
    }

    private transformPatientData(): Array<ScanResultSectionData> {

        const displayTitleMap: Record<PatientDataKeys, string> = {
            firstName: 'First Name',
            lastName: 'Last Name',
            insuranceProvider: 'Insurance Provider',
            address1: 'Address #1',
            address2: 'Address #2',
            diagnose: 'Diagnose',
            healthInsuranceNumber: 'Health Insurance Number',
            insuredPersonNumber: 'Insured Person Number',
            status: 'Status',
            placeOfOperationNumber: 'Place of Operation Number',
            doctorNumber: 'Doctor\'s number',
            unknown: 'Unknown',
        };

        return Object.keys(displayTitleMap)
            .filter(mapKey => this.medicalCertificateScannerResult.patientData[mapKey as PatientDataKeys])
            .map((mapKey) => {
                const patientDataKey = mapKey as PatientDataKeys
                const patientData = this.medicalCertificateScannerResult.patientData[patientDataKey] as MedicalCertificatePatientDataInfoField

                return {
                    key: displayTitleMap[patientDataKey],
                    value: `${patientData.value}` +
                        ` (confidence:${Math.round(patientData.recognitionConfidence * 100)}%)`,
                } as ScanResultSectionData
            });
    }

    private transformDates(): Array<ScanResultSectionData> {

        const displayTitleMap: Record<DatesKeys, string> = {
            incapableOfWorkSince: 'Incapable of work since',
            incapableOfWorkUntil: 'Incapable of work until',
            diagnosedOn: 'Diagnosed on',
            childNeedsCareFrom: 'Child needs care from',
            childNeedsCareUntil: 'Child needs care until',
            birthDate: 'Patient birth date',
            documentDate: 'Document date',
            unknown: 'Unknown',
        };

        return Object.keys(displayTitleMap)
            .filter(mapKey => this.medicalCertificateScannerResult.dates[mapKey as DatesKeys])
            .map((mapKey) => {
                const dateKey = mapKey as DatesKeys
                const dateValue = this.medicalCertificateScannerResult.dates[dateKey] as MedicalCertificateDateField

                return {
                    key: displayTitleMap[dateKey],
                    value: `${dateValue.dateString}` +
                        ` (confidence:${Math.round(dateValue.recognitionConfidence * 100)}%)`,
                } as ScanResultSectionData
            });
    };

    private transformCheckboxes(): Array<ScanResultSectionData> {

        const displayTitleMap: Record<CheckBoxKeys, string> = {
            initialCertificate: 'Initial Certificate',
            renewedCertificate: 'Renewed Certificate',
            workAccident: 'Work Accident',
            assignedToAccidentInsuranceDoctor: 'Assigned to Accident Insurance Doctor',
            accidentYes: 'Accident box checked Yes?',
            accidentNo: 'Accident box checked No?',
            requiresCareYes: 'Child requires care checked Yes?',
            requiresCareNo: 'Child requires care checked No?',
            insuredPayCase: 'Insurance company has to pay?',
            finalCertificate: 'The certificate is final?',
            otherAccident: 'Other Accident?',
            entitlementToContinuedPaymentNo: 'Entitlement To Continued Payment No?',
            entitlementToContinuedPaymentYes: 'Entitlement To Continued Payment Yes?',
            sickPayWasClaimedNo: 'Claimed sick pay No?',
            sickPayWasClaimedYes: 'Claimed sick play Yes?',
            singleParentNo: 'Single parent No?',
            singleParentYes: 'Single parent Yes?',
            unknown: 'Unknown',
        };

        return Object.keys(displayTitleMap)
            .filter(mapKey => this.medicalCertificateScannerResult.checkboxes[mapKey as CheckBoxKeys])
            .map((mapKey) => {
                const checkboxKey = mapKey as CheckBoxKeys
                const checkboxValue = this.medicalCertificateScannerResult.checkboxes[checkboxKey] as MedicalCertificateCheckboxField

                return {
                    key: displayTitleMap[checkboxKey],
                    value: `${checkboxValue.isChecked ? 'YES' : 'NO'}` +
                        ` (confidence:${Math.round(checkboxValue.confidence * 100)}%)`,
                } as ScanResultSectionData
            });
    };
}
