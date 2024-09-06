import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { FeatureId } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';

import {
  startBarcodeScanner,
  BarcodeScannerConfiguration,
  MultipleScanningMode,
} from 'capacitor-plugin-scanbot-sdk/ui_v2';

@Component({
  selector: 'app-rtu-multi-ar-barcode-scanning-feature',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
})
export class RtuMultiArBarcodeScanningFeatureComponent extends ScanbotSdkFeatureComponent {
  override feature = {
    id: FeatureId.RtuMultiArScanning,
    title: 'Multi AR Scanning use case',
  };

  override async featureClicked() {
    // Always make sure you have a valid license on runtime via ScanbotBarcodeSDK.getLicenseInfo()
    if (!(await this.isLicenseValid())) {
      return;
    }

    // Create the default configuration object.
    const config = new BarcodeScannerConfiguration();

    // Configure the usecase.
    config.useCase = new MultipleScanningMode();
    config.useCase.mode = 'UNIQUE';
    config.useCase.sheet.mode = 'COLLAPSED_SHEET';
    config.useCase.sheet.collapsedVisibleHeight = 'SMALL';
    // Configure AR Overlay.
    config.useCase.arOverlay.visible = true;
    config.useCase.arOverlay.automaticSelectionEnabled = false;
    // Configure other parameters, pertaining to use case as needed.

    // Set an array of accepted barcode types.
    config.recognizerConfiguration.barcodeFormats =
      await this.scanbotUtils.getAcceptedBarcodeFormats();
    config.recognizerConfiguration.acceptedDocumentFormats =
      await this.scanbotUtils.getAcceptedBarcodeDocumentFormats();

    // Configure other parameters as needed.

    try {
      const result = await startBarcodeScanner(config);

      if (result.status === 'OK' && result.items.length > 0) {
        // Handle the scanned barcode from result
        this.router.navigate([
          '/barcode-result-fields',
          JSON.stringify(result),
        ]);
      }
    } catch (error: any) {
      await this.utils.showErrorAlert(error.message);
    }
  }
}
