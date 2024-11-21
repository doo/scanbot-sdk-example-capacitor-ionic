import { inject, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ImageFilterComponent } from '../image-filter/image-filter.component';

import { BrightnessFilter, ColorDocumentFilter, ContrastFilter, CustomBinarizationFilter, Field, GenericDocument, GrayscaleFilter, LegacyFilter, ParametricFilter, ScanbotBinarizationFilter, WhiteBlackPointFilter, } from 'capacitor-plugin-scanbot-sdk';
import { ScanResultSectionData } from '../results/scan-result-fields/scan-result-fields.page';

export interface Feature {
    id: FeatureId;
    title: string;
}

export enum FeatureId {
    SinglePageDocumentScanning,
    SinglePageDocumentScanningWithFinder,
    MultiPageDocumentScanning,
    PickDocumentFromGallery,
    ScanMRZ,
    ScanMedicalCertificate,
    ScanGenericDocument,
    ScanEHIC,
    LicenseInfo,
    OcrConfigs,
    LicensePlateScanner,
    TextDataScanner,
    CheckRecognizer,
    RecognizeCheckOnImage,
    RecognizeMrzOnImage,
    RecognizeMedicalCertificateOnImage,
    RecognizeEhicOnImage,
    RecognizeGenericDocumentOnImage,
    AnalyzeDocumentQuality,
    PerformOcrOnImage,
    VINScanner,
}

export interface ImageFilter {
    title: string;
    filter: ParametricFilter;
}

@Injectable({
    providedIn: 'root',
})
export class ScanbotUtils {

    private modalCtrl = inject(ModalController);

    constructor() {
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
