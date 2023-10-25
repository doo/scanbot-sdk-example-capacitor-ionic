import { Injectable, inject } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { AlertController, AlertOptions, LoadingController } from '@ionic/angular';
import {
    AAMVADocumentFormat,
    BarcodeResultField,
    BoardingPassDocumentFormat,
    GS1DocumentFormat,
    GetLicenseInfoResult,
    GetOCRConfigsResult,
    IDCardPDF417DocumentFormat,
    MedicalCertificateDocumentFormat,
    MedicalPlanDocumentFormat,
    SEPADocumentFormat,
    SwissQRCodeDocumentFormat,
    VCardDocumentFormat
} from 'capacitor-plugin-scanbot-sdk';

@Injectable({
    providedIn: 'root'
})
export class CommonUtils {

    private alertController = inject(AlertController);
    private loadingController = inject(LoadingController);

    constructor() { }

    async showAlert(opts?: AlertOptions, onDismiss?: () => any) {
        const alert = await this.alertController.create(opts);
        alert.onDidDismiss().then(onDismiss);
        await alert.present();
    }

    async showResultInfo(result: string) {
        await this.showAlert({ header: 'Result', message: result, buttons: ['OK'] });
    }

    async showErrorAlert(error: string, onDismiss?: () => any) {
        await this.showAlert({ header: 'An unexpected error has occurred', message: error, buttons: ['OK'] }, onDismiss);
    }

    async showWarningAlert(warning: string) {
        await this.showAlert({ header: 'Warning', message: warning, buttons: ['OK'] });
    }

    async showInfoAlert(infoMessage: string) {
        await this.showAlert({ header: 'Info', message: infoMessage, buttons: ['OK'] });
    }

    async showLicenseInfo(info: GetLicenseInfoResult) {
        const formattedText =
            `• The license is ${info.isLicenseValid ? 'VALID' : 'NOT VALID'}`
            + `<br />• Expiration Date: ${info.licenseExpirationDate ? new Date(Number(info.licenseExpirationDate)).toDateString() : 'N/A'}`
            + `<br />• Status: ${info.licenseStatus}`;

        await this.showAlert({ header: 'License', message: formattedText, buttons: ['OK'] });
    }

    async showOCRConfigs(info: GetOCRConfigsResult) {
        await this.showAlert({ header: 'OCR', message: JSON.stringify(info), buttons: ['OK'] });
    }

    async showLoader(message?: string | undefined) {
        (await this.loadingController.create({ message: message !== undefined ? message : 'Please wait ...' })).present();
    }

    async dismissLoader() {
        try {
            await this.loadingController.dismiss();
        } catch (e) { }
    }

    logBarcodeDocument(barcodeItem: BarcodeResultField | undefined) {
        if (!barcodeItem?.formattedResult)
            return;

        console.log('Formatted result:\n' + JSON.stringify(barcodeItem.formattedResult, null, 4));

        switch (barcodeItem.formattedResult.documentFormat) {
            case 'AAMVA':
                const aamva = barcodeItem.formattedResult as AAMVADocumentFormat;
                console.log('AAMVA Number of entries: ' + aamva.numberOfEntries);
                break;
            case 'BOARDING_PASS':
                const boardingPass = barcodeItem.formattedResult as BoardingPassDocumentFormat;
                console.log('Boarding Pass Security Data: ' + boardingPass.securityData);
                break;
            case 'DE_MEDICAL_PLAN':
                const deMedicalPlan = barcodeItem.formattedResult as MedicalPlanDocumentFormat;
                console.log('Medical Plan Total number of pages: ' + deMedicalPlan.totalNumberOfPages);
                break;
            case 'MEDICAL_CERTIFICATE':
                const medicalCertificate = barcodeItem.formattedResult as MedicalCertificateDocumentFormat;

                const mcField = medicalCertificate.fields[0];
                if (!mcField)
                    return;

                console.log(`Medical Certificate first field: ${mcField.type}: ${mcField.value}`);
                break;
            case 'ID_CARD_PDF_417':
                const idCard = barcodeItem.formattedResult as IDCardPDF417DocumentFormat;

                const idCardField = idCard.fields[0];
                if (!idCardField)
                    return;

                console.log(`ID Card PDF417 first field: ${idCardField.type}: ${idCardField.value}`);
                break;
            case 'SEPA':
                const sepa = barcodeItem.formattedResult as SEPADocumentFormat;

                const sepaField = sepa.fields[0];
                if (!sepaField)
                    return;

                console.log(`SEPA first field: ${sepaField.type}: ${sepaField.value}`);
                break;
            case 'SWISS_QR':
                const swissQR = barcodeItem.formattedResult as SwissQRCodeDocumentFormat;

                const swissQrField = swissQR.fields[0];
                if (!swissQrField)
                    return;

                console.log(`SwissQR first field: ${swissQrField.type}: ${swissQrField.value}`);
                break;
            case 'VCARD':
                const vCard = barcodeItem.formattedResult as VCardDocumentFormat;

                const vCardField = vCard.fields[0];
                if (!vCardField)
                    return;

                console.log(`vCard first field: ${vCardField.type}: ${vCardField.values.join(',')}`);
                break;
            case 'GS1':
                const gs1 = barcodeItem.formattedResult as GS1DocumentFormat;

                const gs1Field = gs1.fields[0];
                if (!gs1Field)
                    return;

                console.log(`GS1 first field: ${gs1Field.fieldDescription}: ${gs1Field.rawValue}`);
                break;
        }
    }

    isiOSPlatform(): boolean {
        return Capacitor.getPlatform() === 'ios';
    }
}
