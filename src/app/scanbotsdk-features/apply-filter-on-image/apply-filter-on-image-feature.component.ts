import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { Feature, FeatureId } from 'src/app/utils/scanbot-utils';

import { ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-apply-filter-on-image-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class ApplyFilterOnImageFeature extends ScanbotSdkFeatureComponent {
    override feature: Feature = {
        id: FeatureId.ApplyFilterOnImage,
        title: 'Apply Image Filter',
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
            // Choose one of the available filters
            const imageFilter = await this.scanbotUtils.chooseFilter();

            if (imageFilter) {
                await this.utils.showLoader();

                const result = await ScanbotSDK.applyImageFilters({
                    imageFileUri: imageFileUri,
                    filters: [imageFilter],
                });
                const filteredImageUri: string = result.imageFileUri;

                this.utils.dismissLoader();

                if (filteredImageUri) {
                    this.router.navigate([
                        '/image-results',
                        JSON.stringify([filteredImageUri]),
                    ]);
                } else {
                    this.utils.showWarningAlert('Something went wrong')
                }
            }
        } catch (e: any) {
            await this.utils.dismissLoader();
            this.utils.showErrorAlert(e.message);
        }
    }
}
