import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/utils/scanbot-utils';

import { DetectBarcodesOnImageArguments, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-detect-barcodes-on-image-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class DetectBarcodesOnImageFeature extends ScanbotSdkFeatureComponent {
    override feature = {
        id: FeatureId.DetectBarcodesOnStillImage,
        title: 'Detect Barcodes on Image',
    };

    override async featureClicked() {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        // Select image from the library
        const imageFileUri = await this.imageUtils.selectImageFromLibrary();
        if (!imageFileUri) {
            return;
        }

        try {
            const args: DetectBarcodesOnImageArguments = {
                imageFileUri: imageFileUri,
                stripCheckDigits: true,
                barcodeFormats: await this.scanbotUtils.getAcceptedBarcodeFormats(), // optional filter for specific barcode types
                acceptedDocumentFormats: await this.scanbotUtils.getAcceptedBarcodeDocumentFormats() // optional filter for specific document types
                // see further args ...
            };
            await this.utils.showLoader();

            const result = await ScanbotSDK.detectBarcodesOnImage(args);

            await this.utils.dismissLoader();
            if (result.barcodes.length > 0) {
                // Handle the detected barcode(s) from result
                this.router.navigate([
                    '/legacy-barcode-result-fields',
                    JSON.stringify(result),
                ]);
            } else {
                this.utils.showInfoAlert('No barcodes detected');
            }
        } catch (e: any) {
            await this.utils.dismissLoader();
            this.utils.showErrorAlert(e.message);
        }
    }
}
