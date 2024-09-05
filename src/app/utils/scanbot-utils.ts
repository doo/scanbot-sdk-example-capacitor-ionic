import { inject, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

import { ImageFilterComponent } from '../image-filter/image-filter.component';

import { BarcodeDocumentFormat, BarcodeFormat, BrightnessFilter, ColorDocumentFilter, ContrastFilter, CustomBinarizationFilter, Field, GenericDocument, GrayscaleFilter, ImageFilterType, LegacyFilter, LicenseStatus, ParametricFilter, ScanbotBinarizationFilter, WhiteBlackPointFilter, } from 'capacitor-plugin-scanbot-sdk';
import { ScanResultSectionData } from '../results/scan-result-fields/scan-result-fields.page';

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
    RtuSingleScanning,
    RtuMultiScanning,
    RtuMultiArScanning,
    RtuFindAndPickScanning,
    LegacyScanBarcodes,
    LegacyScanBatchBarcodes,
    DetectBarcodesOnStillImage,
    DetectBarcodesOnStillImages,
    ScanMRZ,
    ScanMedicalCertificate,
    ScanGenericDocument,
    ScanEHIC,
    LicenseInfo,
    OcrConfigs,
    LicensePlateScanner,
    TextDataScanner,
    CheckRecognizer,
    BarcodeCameraViewComponent,
    RecognizeCheckOnImage,
    RecognizeMrzOnImage,
    RecognizeMedicalCertificateOnImage,
    RecognizeEhicOnImage,
    RecognizeGenericDocumentOnImage,
    ApplyFilterOnImage,
    AnalyzeDocumentQuality,
    PerformOcrOnImage,
    FinderDocumentScanner,
    VINScanner,
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
    filter: ParametricFilter;
}

@Injectable({
    providedIn: 'root',
})
export class ScanbotUtils {

    public readonly BARCODE_DOCUMENT_FORMATS_FILTER_ENABLED_KEY = 'barcodeDocumentFormatsEnabled';

    private modalCtrl = inject(ModalController);

    constructor() {
    }

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
                format: 'MICRO_QR_CODE',
                accepted: await this.isBarcodeFormatAccepted('MICRO_QR_CODE'),
            },
            {
                format: 'DATABAR',
                accepted: await this.isBarcodeFormatAccepted('DATABAR'),
            },
            {
                format: 'DATABAR_EXPANDED',
                accepted: await this.isBarcodeFormatAccepted('DATABAR_EXPANDED'),
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
            {
                format: 'USPS_INTELLIGENT_MAIL',
                accepted: await this.isBarcodeFormatAccepted(
                    'USPS_INTELLIGENT_MAIL',
                ),
            }, {
                format: 'ROYAL_MAIL',
                accepted: await this.isBarcodeFormatAccepted(
                    'ROYAL_MAIL',
                ),
            }, {
                format: 'JAPAN_POST',
                accepted: await this.isBarcodeFormatAccepted(
                    'JAPAN_POST',
                ),
            }, {
                format: 'ROYAL_TNT_POST',
                accepted: await this.isBarcodeFormatAccepted(
                    'ROYAL_TNT_POST',
                ),
            }, {
                format: 'AUSTRALIA_POST',
                accepted: await this.isBarcodeFormatAccepted(
                    'AUSTRALIA_POST',
                ),
            }, {
                format: 'DATABAR_LIMITED',
                accepted: await this.isBarcodeFormatAccepted(
                    'DATABAR_LIMITED',
                ),
            }, {
                format: 'GS1_COMPOSITE',
                accepted: await this.isBarcodeFormatAccepted(
                    'GS1_COMPOSITE',
                ),
            }, {
                format: 'MICRO_PDF_417',
                accepted: await this.isBarcodeFormatAccepted(
                    'MICRO_PDF_417',
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
            {
                title: 'Scanbot Binarization',
                filter: new ScanbotBinarizationFilter()
            },
            {
                title: 'Custom Binarization',
                filter: new CustomBinarizationFilter({ preset: 'PRESET_1' })
            },
            {
                title: 'Color Document',
                filter: new ColorDocumentFilter()
            },
            {
                title: 'Brightness',
                filter: new BrightnessFilter({ brightness: 0.2 })
            },
            {
                title: 'Contrast',
                filter: new ContrastFilter({ contrast: 2 })
            },
            {
                title: 'Grayscale',
                filter: new GrayscaleFilter()
            },
            {
                title: 'White Black Point',
                filter: new WhiteBlackPointFilter({ blackPoint: 0.2, whitePoint: 0.8 }),
            },
            {
                title: 'Legacy',
                filter: new LegacyFilter()
            }
        ];
    }

    async chooseFilter(): Promise<ParametricFilter | undefined> {
        const filterModal = await this.modalCtrl.create({
            component: ImageFilterComponent,
            id: 'image-filter',
            backdropDismiss: true,
        });
        await filterModal.present();

        return (
            await filterModal.onDidDismiss()
        ).data;
    }

    async getAcceptedBarcodeFormats(): Promise<BarcodeFormat[]> {
        return (await this.getBarcodeSettings())
            .filter((x) => x.accepted)
            .map((x) => x.format);
    }

    // Default is undefined (true). Only if explicitly is set to false, then it will be disabled.
    private async isBarcodeFormatAccepted(
        barcodeFormat: BarcodeFormat,
    ): Promise<boolean> {
        return (
            (await Preferences.get({ key: barcodeFormat.toString() })).value !== 'false'
        );
    }

    async setBarcodeFormatAccepted(
        barcodeFormat: BarcodeFormat,
        accepted: boolean
    ) {
        await Preferences.set({
            key: barcodeFormat.toString(),
            value: accepted.toString(),
        });
    }

    async getAcceptedBarcodeDocumentFormats(): Promise<BarcodeDocumentFormat[]> {
        const filterIsEnabled = await this.isBarcodeDocumentFormatsFilterEnabled();

        if (filterIsEnabled) {
            return (await this.getBarcodeDocumentSettings())
                .filter((x) => x.accepted)
                .map((x) => x.format);
        } else {
            return [];
        }
    }

    // Default is undefined (true). Only if explicitly is set to false, then it will be disabled.
    private async isBarcodeDocumentFormatAccepted(barcodeDocumentFormat: BarcodeDocumentFormat): Promise<boolean> {
        return (
            (await Preferences.get({ key: barcodeDocumentFormat.toString() })).value !== 'false'
        );
    }

    async setBarcodeDocumentFormatAccepted(barcodeDocumentFormat: BarcodeDocumentFormat, accepted: boolean) {
        await Preferences.set({
            key: barcodeDocumentFormat.toString(),
            value: accepted.toString(),
        });
    }

    // Default is undefined (false). Only if explicitly is set to true, then it will be enabled.
    async isBarcodeDocumentFormatsFilterEnabled(): Promise<boolean> {
        return (
            (await Preferences.get({ key: this.BARCODE_DOCUMENT_FORMATS_FILTER_ENABLED_KEY })).value === 'true'
        );
    }

    async setBarcodeDocumentFormatsFilterEnabled(enabled: boolean) {
        await Preferences.set({
            key: this.BARCODE_DOCUMENT_FORMATS_FILTER_ENABLED_KEY,
            value: enabled.toString(),
        });
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

    private extractGDRFields(document: GenericDocument): Field[] {
        let allFields = document.fields;

        document.children.forEach(child => {
            allFields = allFields.concat(this.extractGDRFields(child));
        });

        return allFields;
    }

    transformGenericDocument(document?: GenericDocument, withoutConfidence = false): Array<ScanResultSectionData> {
        if (!document) {
            return [];
        }

        return this.extractGDRFields(document)
            .map(field => {
                let value = field.value?.text

                if (value) {
                    if (!withoutConfidence) {
                        value += ` (confidence:${Math.round(field.value!.confidence * 100)}%)`
                    }
                } else {
                    value = '/'
                }

                return {
                    key: field.type.name,
                    value: value,
                } as ScanResultSectionData;
            });
    }
}
