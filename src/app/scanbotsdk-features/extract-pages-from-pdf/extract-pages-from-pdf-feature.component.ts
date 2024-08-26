import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/utils/scanbot-utils';

import { ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-extract-pages-from-pdf-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class ExtractPagesFromPdfFeature extends ScanbotSdkFeatureComponent {
    override feature = {
        id: FeatureId.ExtractPagesFromPdf,
        title: 'Extract pages from PDF',
    };

    override async featureClicked() {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        try {
            // Select the PDF file from the library
            const pdfFilePath = await this.fileUtils.selectPdfFile();
            await this.utils.showLoader();

            const result = await ScanbotSDK.extractPagesFromPdf({
                pdfFilePath: pdfFilePath,
            });

            this.utils.dismissLoader();
            if (result.pages.length > 0) {
                await this.preferencesUtils.savePages(result.pages);
                this.router.navigate(['/page-results']);
            } else {
                this.utils.showInfoAlert('No pages extracted');
            }
        } catch (e: any) {
            await this.utils.dismissLoader();
            this.utils.showErrorAlert(e.message);
        }
    }
}
