import { inject, Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { Capacitor } from '@capacitor/core';

import { AppComponent } from '../app.component';
import { ImageFilterComponent } from '../image-filter/image-filter.component';
import {
  ScanResultSection,
  ScanResultSectionData,
} from '../results/scan-results/scan-result-page/scan-result.page';

import {
  BrightnessFilter,
  ColorDocumentFilter,
  ContrastFilter,
  CustomBinarizationFilter,
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

  traverseGenericDocument(document: GenericDocument | null): Array<GenericDocument> {
    if (!document) {
      return [];
    }

    let documents: GenericDocument[] = [document];

    if (document.children.length > 0) {
      document.children.forEach((child: GenericDocument) => {
        documents = documents.concat(this.traverseGenericDocument(child));
      });
    }

    return documents;
  }

  transformGenericDocument(
    document: GenericDocument | null,
    options?: {
      includeConfidence?: boolean;
      includeHeader?: boolean;
      includeImage?: boolean;
    },
  ): Array<ScanResultSection> {
    if (!document) {
      return [];
    }

    return this.traverseGenericDocument(document).map((item) => {
      return {
        header: options?.includeHeader ? item.type.name : undefined,
        image: options?.includeImage ? item.crop?.buffer : undefined,
        data: item.fields.map((field) => {
          let value = field.value?.text;

          if (value) {
            if (options?.includeConfidence) {
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
        }),
      };
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
