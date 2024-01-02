import { Injectable, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

import { ImageFilterComponent } from '../image-filter/image-filter.component';

import {
    BarcodeDocumentFormat,
    BarcodeFormat,
    ImageFilterType,
    LicenseStatus,
} from 'capacitor-plugin-scanbot-sdk';

export interface Feature {
    id: FeatureId;
    title: string;
}

export enum FeatureId {
    DocumentScanner,
    DetectDocumentFromPage,
    DetectDocumentFromImage,
    ExtractPagesFromPdf,
    ExtractImagesFromPdf,
    ScanBarcodes,
    ScanBatchBarcodes,
    DetectBarcodesOnStillImage,
    DetectBarcodesOnStillImages,
    ScanMRZ,
    ScanMedicalCertificate,
    ScanGenericDocument,
    ScanEHIC,
    LicenseInfo,
    OcrConfigs,
    LicensePlateScannerML,
    LicensePlateScannerClassic,
    TextDataScanner,
    CheckRecognizer,
    BarcodeCameraViewComponent,
    RecognizeCheckOnImage,
    ApplyFilterOnImage,
    FinderDocumentScanner,
}

export interface BarcodeSetting {
    format: BarcodeFormat;
    accepted: boolean;
}

export interface BarcodeDocumentSetting {
    format: BarcodeDocumentFormat;
    accepted: boolean;
}

export interface ImageFilter {
    title: string;
    type: ImageFilterType;
}

@Injectable({
    providedIn: 'root',
})
export class ScanbotUtils {

    public static readonly BARCODE_DOCUMENT_FORMATS_ENABLED_KEY = 'barcodeDocumentFormatsEnabled';

    private modalCtrl = inject(ModalController);

    constructor() { }

    async getBarcodeSettings(): Promise<BarcodeSetting[]> {
        return [
            {
                format: 'AZTEC',
                accepted: await this.isBarcodeFormatAccepted('AZTEC'),
            },
            {
                format: 'CODABAR',
                accepted: await this.isBarcodeFormatAccepted('CODABAR'),
            },
            {
                format: 'CODE_25',
                accepted: await this.isBarcodeFormatAccepted('CODE_25'),
            },
            {
                format: 'CODE_39',
                accepted: await this.isBarcodeFormatAccepted('CODE_39'),
            },
            {
                format: 'CODE_93',
                accepted: await this.isBarcodeFormatAccepted('CODE_93'),
            },
            {
                format: 'CODE_128',
                accepted: await this.isBarcodeFormatAccepted('CODE_128'),
            },
            {
                format: 'DATA_MATRIX',
                accepted: await this.isBarcodeFormatAccepted('DATA_MATRIX'),
            },
            {
                format: 'EAN_8',
                accepted: await this.isBarcodeFormatAccepted('EAN_8'),
            },
            {
                format: 'EAN_13',
                accepted: await this.isBarcodeFormatAccepted('EAN_13'),
            },
            {
                format: 'ITF',
                accepted: await this.isBarcodeFormatAccepted('ITF'),
            },
            {
                format: 'PDF_417',
                accepted: await this.isBarcodeFormatAccepted('PDF_417'),
            },
            {
                format: 'QR_CODE',
                accepted: await this.isBarcodeFormatAccepted('QR_CODE'),
            },
            {
                format: 'RSS_14',
                accepted: await this.isBarcodeFormatAccepted('RSS_14'),
            },
            {
                format: 'RSS_EXPANDED',
                accepted: await this.isBarcodeFormatAccepted('RSS_EXPANDED'),
            },
            {
                format: 'UPC_A',
                accepted: await this.isBarcodeFormatAccepted('UPC_A'),
            },
            {
                format: 'UPC_E',
                accepted: await this.isBarcodeFormatAccepted('UPC_E'),
            },
            {
                format: 'UNKNOWN',
                accepted: await this.isBarcodeFormatAccepted('UNKNOWN'),
            },
            {
                format: 'MSI_PLESSEY',
                accepted: await this.isBarcodeFormatAccepted('MSI_PLESSEY'),
            },
            {
                format: 'IATA_2_OF_5',
                accepted: await this.isBarcodeFormatAccepted('IATA_2_OF_5'),
            },
            {
                format: 'INDUSTRIAL_2_OF_5',
                accepted: await this.isBarcodeFormatAccepted(
                    'INDUSTRIAL_2_OF_5',
                ),
            },
        ];
    }

    async getBarcodeDocumentSettings(): Promise<BarcodeDocumentSetting[]> {
        return [
            {
                format: 'AAMVA',
                accepted: await this.isBarcodeDocumentFormatAccepted('AAMVA'),
            },
            {
                format: 'BOARDING_PASS',
                accepted: await this.isBarcodeDocumentFormatAccepted(
                    'BOARDING_PASS',
                ),
            },
            {
                format: 'DE_MEDICAL_PLAN',
                accepted: await this.isBarcodeDocumentFormatAccepted(
                    'DE_MEDICAL_PLAN',
                ),
            },
            {
                format: 'MEDICAL_CERTIFICATE',
                accepted: await this.isBarcodeDocumentFormatAccepted(
                    'MEDICAL_CERTIFICATE',
                ),
            },
            {
                format: 'ID_CARD_PDF_417',
                accepted: await this.isBarcodeDocumentFormatAccepted(
                    'ID_CARD_PDF_417',
                ),
            },
            {
                format: 'SEPA',
                accepted: await this.isBarcodeDocumentFormatAccepted('SEPA'),
            },
            {
                format: 'SWISS_QR',
                accepted: await this.isBarcodeDocumentFormatAccepted(
                    'SWISS_QR',
                ),
            },
            {
                format: 'VCARD',
                accepted: await this.isBarcodeDocumentFormatAccepted('VCARD'),
            },
            {
                format: 'GS1',
                accepted: await this.isBarcodeDocumentFormatAccepted('GS1'),
            },
        ];
    }

    getImageFilters(): ImageFilter[] {
        return [
            { title: 'None', type: 'ImageFilterTypeNone' },
            { title: 'Color', type: 'ImageFilterTypeColor' },
            { title: 'Gray', type: 'ImageFilterTypeGray' },
            { title: 'Binarized', type: 'ImageFilterTypeBinarized' },
            { title: 'Color Document', type: 'ImageFilterTypeColorDocument' },
            { title: 'Pure Binarized', type: 'ImageFilterTypePureBinarized' },
            {
                title: 'Background Clean',
                type: 'ImageFilterTypeBackgroundClean',
            },
            { title: 'Black And White', type: 'ImageFilterTypeBlackAndWhite' },
            {
                title: 'Otsu Binarization',
                type: 'ImageFilterTypeOtsuBinarization',
            },
            {
                title: 'Deep Binarization',
                type: 'ImageFilterTypeDeepBinarization',
            },
            { title: 'Edge Highlight', type: 'ImageFilterTypeEdgeHighlight' },
            {
                title: 'Low Light Binarization',
                type: 'ImageFilterTypeLowLightBinarization',
            },
            {
                title: 'Low Light Binarization 2',
                type: 'ImageFilterTypeLowLightBinarization2',
            },
            { title: 'Pure Gray', type: 'ImageFilterTypePureGray' },
        ];
    }

    async chooseFilter(): Promise<ImageFilterType | undefined> {
        const filterModal = await this.modalCtrl.create({
            component: ImageFilterComponent,
            id: 'image-filter',
            backdropDismiss: true,
        });
        await filterModal.present();

        const selectedFilterType: ImageFilterType | undefined = (
            await filterModal.onDidDismiss()
        ).data;
        return selectedFilterType;
    }

    async getAcceptedBarcodeFormats(): Promise<BarcodeFormat[]> {
        return (await this.getBarcodeSettings())
            .filter((x) => x.accepted)
            .map((x) => x.format);
    }

    private async isBarcodeFormatAccepted(
        barcodeFormat: BarcodeFormat,
    ): Promise<boolean> {
        const prefValue = (
            await Preferences.get({ key: barcodeFormat.toString() })
        ).value;

        if (barcodeFormat === 'UNKNOWN') {
            return prefValue === 'true';
        } else {
            return prefValue !== 'false';
        }
    }

    async getAcceptedBarcodeDocumentFormats(): Promise<
        BarcodeDocumentFormat[]
    > {
        return (await this.getBarcodeDocumentSettings())
            .filter((x) => x.accepted)
            .map((x) => x.format);
    }

    private async isBarcodeDocumentFormatAccepted(
        barcodeDocumentFormat: BarcodeDocumentFormat,
    ): Promise<boolean> {
        const prefValue = (
            await Preferences.get({ key: barcodeDocumentFormat.toString() })
        ).value;

        return prefValue !== 'false';
    }

    async isBarcodeDocumentFormatsEnabled(): Promise<boolean> {
        const prefValue = (
            await Preferences.get({ key: ScanbotUtils.BARCODE_DOCUMENT_FORMATS_ENABLED_KEY })
        ).value;

        return prefValue === 'true';
    }

    getMessageFromLicenseStatus(status: LicenseStatus): string {
        switch (status) {
            case 'Okay':
                return 'License key is correct or license status is wrong';
            case 'Trial':
                return 'The trial period has ended';
            case 'Expired':
                return 'The license key has expired!';
            case 'WrongOS':
                return 'The license key does not support the current platform';
            case 'Corrupted':
                return 'The license key seems to be corrupted';
            case 'AppIDMismatch':
                return 'The App ID does not match the license key App ID';
            case 'NotSet':
                return 'The license key has not been set';
            default:
                return 'Unknown error';
        }
    }
}
