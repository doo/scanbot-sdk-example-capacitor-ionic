import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/utils/scanbot-utils';

import { ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-detect-document-on-page-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class DetectDocumentOnPageFeature extends ScanbotSdkFeatureComponent {
    override feature = {
        id: FeatureId.DetectDocumentFromPage,
        title: 'Import Image & Detect Document on Page',
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
            await this.utils.showLoader();

            const page = await ScanbotSDK.createPage({ imageUri: imageFileUri });
            const result = await ScanbotSDK.detectDocumentOnPage({ page: page });

            await this.preferencesUtils.savePage(result);
            this.utils.dismissLoader();
            this.router.navigate(['/page-results']);
        } catch (e: any) {
            await this.utils.dismissLoader();
            this.utils.showErrorAlert(e.message);
        }
    }
}
