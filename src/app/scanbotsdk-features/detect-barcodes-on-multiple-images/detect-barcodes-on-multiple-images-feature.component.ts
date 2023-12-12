import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/utils/scanbot-utils';

import { DetectBarcodesOnImagesArguments, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-detect-barcodes-on-multiple-images-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class DetectBarcodesOnMultipleImagesFeature extends ScanbotSdkFeatureComponent {
    override feature = {
        id: FeatureId.DetectBarcodesOnStillImages,
        title: 'Import Multiple Images & Detect Barcodes',
    };

    override async featureClicked() {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        try {
            // Select multiple images from the library
            const imageFileUris = await this.imageUtils.selectImagesFromLibrary(true);

            const args: DetectBarcodesOnImagesArguments = {
                imageFileUris: imageFileUris,
                stripCheckDigits: true,
                barcodeFormats: await this.scanbotUtils.getAcceptedBarcodeFormats(), // optional filter for specific barcode types
                acceptedDocumentFormats:
                    (await this.scanbotUtils.isBarcodeDocumentFormatsEnabled())
                        ? await this.scanbotUtils.getAcceptedBarcodeDocumentFormats()
                        : [], // optional filter for specific document types
                // see further args ...
            };
            await this.utils.showLoader();

            const result = await ScanbotSDK.detectBarcodesOnImages(args);

            await this.utils.dismissLoader();
            if (result.results.length > 0) {
                // Handle the detected barcode(s) from result
                this.utils.showResultInfo(JSON.stringify(result.results));
            } else {
                this.utils.showInfoAlert('No barcodes detected');
            }
        } catch (e: any) {
            await this.utils.dismissLoader();
            this.utils.showErrorAlert(e.message);
        }
    }
}
