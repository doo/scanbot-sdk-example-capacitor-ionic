import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CommonUtils } from '../../utils/common-utils';
import { FileUtils } from '../../utils/file-utils';
import { ImageUtils } from '../../utils/image-utils';
import { Feature, ScanbotUtils } from '../../utils/scanbot-utils';

import { ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-scanbotsdk',
  templateUrl: './scanbotsdk-feature.component.html',
  styleUrls: ['./scanbotsdk-feature.component.scss'],
  imports: [CommonModule, IonicModule],
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
    try {
      const result = await ScanbotSDK.getLicenseInfo();

      if (result.isLicenseValid) {
        // We have a valid (trial) license and can call other Scanbot Barcode Scanner SDK methods.
        // E.g. launch the Barcode Scanner
        return true;
      } else {
        // The license is not valid. We will return false and show the status
        this.utils.showWarningAlert(result.licenseStatusMessage ?? 'Invalid License');
      }
    } catch (error: any) {
      this.utils.showErrorAlert(error);
    }

    return false;
  }
}
