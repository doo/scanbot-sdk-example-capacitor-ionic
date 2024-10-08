import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/utils/scanbot-utils';

import { ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-extract-images-from-pdf-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class ExtractImagesFromPdfFeature extends ScanbotSdkFeatureComponent {
    override feature = {
        id: FeatureId.ExtractImagesFromPdf,
        title: 'Extract Images from PDF',
    };

    override async featureClicked() {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        // Select the PDF file from the library
        const pdfFilePath = await this.fileUtils.selectPdfFile();
        if (!pdfFilePath) {
            return;
        }

        try {
            await this.utils.showLoader();

            const result = await ScanbotSDK.extractImagesFromPdf({
                pdfFilePath: pdfFilePath,
            });

            this.utils.dismissLoader();

            if (result.imageFilesUrls.length > 0) {
                this.router.navigate([
                    '/image-results',
                    JSON.stringify(result.imageFilesUrls),
                ]);
            } else {
                this.utils.showInfoAlert('No images extracted');
            }
        } catch (e: any) {
            await this.utils.dismissLoader();
            this.utils.showErrorAlert(e.message);
        }
    }
}
