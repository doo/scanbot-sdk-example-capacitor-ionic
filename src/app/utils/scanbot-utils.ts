import { inject, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { Capacitor } from '@capacitor/core';

import { AppComponent } from '../app.component';
import { ImageFilterComponent } from '../image-filter/image-filter.component';
import { ScanResultSectionData } from '../results/scan-results/scan-result-page/scan-result.page';

import {
  BrightnessFilter,
  ColorDocumentFilter,
  ContrastFilter,
  CustomBinarizationFilter,
  Field,
  GenericDocument,
  GrayscaleFilter,
  LegacyFilter,
  PageData,
  ParametricFilter,
  ScanbotBinarizationFilter,
  ScanbotSDK,
  WhiteBlackPointFilter,
} from 'capacitor-plugin-scanbot-sdk';

export interface Feature {
  title: string;
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

  constructor() {}

  getImageFilters(): ImageFilter[] {
    return [
      {
        title: 'Scanbot Binarization',
        filter: new ScanbotBinarizationFilter(),
      },
      {
        title: 'Custom Binarization',
        filter: new CustomBinarizationFilter({ preset: 'PRESET_1' }),
      },
      {
        title: 'Color Document',
        filter: new ColorDocumentFilter(),
      },
      {
        title: 'Brightness',
        filter: new BrightnessFilter({ brightness: 0.2 }),
      },
      {
        title: 'Contrast',
        filter: new ContrastFilter({ contrast: 2 }),
      },
      {
        title: 'Grayscale',
        filter: new GrayscaleFilter(),
      },
      {
        title: 'White Black Point',
        filter: new WhiteBlackPointFilter({ blackPoint: 0.2, whitePoint: 0.8 }),
      },
      {
        title: 'Legacy',
        filter: new LegacyFilter(),
      },
    ];
  }

  async chooseFilter(): Promise<ParametricFilter | undefined> {
    const filterModal = await this.modalCtrl.create({
      component: ImageFilterComponent,
      id: 'image-filter',
      backdropDismiss: true,
    });
    await filterModal.present();

    return (await filterModal.onDidDismiss()).data;
  }

  private extractGDRFields(document: GenericDocument): Field[] {
    return [...document.fields, ...document.children.map(this.extractGDRFields).flat()];
  }

  transformGenericDocument(
    document?: GenericDocument,
    withoutConfidence = false,
  ): Array<ScanResultSectionData> {
    if (!document) {
      return [];
    }

    return this.extractGDRFields(document).map((field) => {
      let value = field.value?.text;

      if (value) {
        if (!withoutConfidence) {
          value += ` (confidence:${Math.round(field.value!.confidence * 100)}%)`;
        }
      } else {
        value = '/';
      }

      return {
        image: field?.image?.buffer,
        key: field.type.name,
        value: value,
      } as ScanResultSectionData;
    });
  }

  async getPageDataPreview(pageToPreview: PageData): Promise<string> {
    if (AppComponent.FILE_ENCRYPTION_ENABLED) {
      return `data:image/jpeg;base64,${await this.decryptImageUrl(pageToPreview.documentImagePreviewURI || pageToPreview.originalImageURI)}`;
    } else {
      return Capacitor.convertFileSrc(
        (pageToPreview.documentImagePreviewURI || pageToPreview.originalImageURI) +
          '?' +
          Date.now(),
      );
    }
  }

  private async decryptImageUrl(encryptedUrl: string): Promise<string> {
    let imageAsBase64 = '';

    try {
      imageAsBase64 = (
        await ScanbotSDK.getImageData({
          imageFileUri: encryptedUrl,
        })
      ).base64ImageData;
    } catch (error: any) {
      console.error(error.message);
    }

    return imageAsBase64;
  }
}
