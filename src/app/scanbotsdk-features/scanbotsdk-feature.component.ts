import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { FileUtils } from '../utils/file-utils';
import { CommonUtils } from '../utils/common-utils';
import { ImageUtils } from '../utils/image-utils';
import { Feature, ScanbotUtils } from '../utils/scanbot-utils';

import { ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-scanbotsdk-feature',
    templateUrl: './scanbotsdk-feature.component.html',
    styleUrls: ['./scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class ScanbotSdkFeatureComponent {
    @Input() feature!: Feature;

    scanbotUtils = inject(ScanbotUtils);
    utils = inject(CommonUtils);
    imageUtils = inject(ImageUtils);
    fileUtils = inject(FileUtils);
    router = inject(Router);

    async featureClicked() {
        throw new Error('Not implemented');
    }

    async isLicenseValid(): Promise<boolean> {
        const licenseInfo = await ScanbotSDK.getLicenseInfo();

        if (licenseInfo.isLicenseValid) {
            // We have a valid (trial) license and can call other Scanbot SDK methods.
            // E.g. launch the Document Scanner
            return true;
        } else {
            // The license is not valid. We will return false and show the status
            this.utils.showWarningAlert(
                this.scanbotUtils.getMessageFromLicenseStatus(licenseInfo.licenseStatus),
            );
            return false;
        }
    }
}
