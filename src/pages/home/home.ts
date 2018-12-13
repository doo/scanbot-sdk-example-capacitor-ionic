import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';

import {CameraResultType, CameraSource, Plugins} from '@capacitor/core';

import {MrzScannerConfiguration} from 'cordova-plugin-scanbot-sdk';

import {ScanbotSdkProvider} from '../../providers/scanbot-sdk-provider';
import {ImageResultsProvider} from '../../providers/image-results-provider';
import {ImageResultsPage} from '../image-results/image-results';
import {UiService} from "../../providers/ui-service";

// We use the the Capacitor Camera API just to pick a photo from the Photo Library (photo album).
const { Camera } = Plugins;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private navCtrl: NavController,
              private platform: Platform,
              private uiService: UiService,
              private scanbot: ScanbotSdkProvider,
              private imageResultsProvider: ImageResultsProvider
  ) {
    scanbot.onInitialize(error => {
      if (error) {
        this.uiService.showAlert(error.message);
      }
    });
  }

  async startDocumentScanner() {
    if (!(await this.scanbot.checkLicense())) { return; }

    const configs = this.scanbot.globalDocScannerConfigs();
    const result = await this.scanbot.SDK.UI.startDocumentScanner({uiConfigs: configs});

    if (result.status === 'CANCELED') {
      // user has canceled the scanning operation
      return;
    }

    this.imageResultsProvider.addPages(result.pages);
    this.gotoImageResults();
  }

  async pickImageFromGallery() {
    // Import an image from Photo Library and run auto document detection on it.

    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      source: CameraSource.Photos,
      resultType: CameraResultType.Uri
    });
    const originalImageFileUri = image.path;

    if (!(await this.scanbot.checkLicense())) { return; }

    const loading = this.uiService.createLoading('Auto-detecting and cropping...');
    try {
      loading.present();
      // First create a new SDK page with the selected original image file:
      const createResult = await this.scanbot.SDK.createPage({originalImageFileUri});
      // and then run auto document detection and cropping on this new page:
      const docResult = await this.scanbot.SDK.detectDocumentOnPage({page: createResult.page});

      this.imageResultsProvider.addPages([docResult.page]);
      this.gotoImageResults();
    }
    finally {
      loading.dismiss();
    }
  }

  gotoImageResults() {
    this.navCtrl.push(ImageResultsPage);
  }

  async startBarcodeScanner() {
    if (!(await this.scanbot.checkLicense())) { return; }

    const result = await this.scanbot.SDK.UI.startBarcodeScanner({
      uiConfigs: {
        // Customize colors, text resources, behavior, etc..
        finderTextHint: 'Please align the barcode or QR code in the frame above to scan it.'
      }
    });

    if (result.status == 'OK') {
      this.uiService.showAlert(result.barcodeResult.textValue, `Barcode: ${result.barcodeResult.barcodeFormat}`);
    }
  }

  async startMrzScanner() {
    if (!(await this.scanbot.checkLicense())) { return; }

    let config: MrzScannerConfiguration = {
      // Customize colors, text resources, etc..
      finderTextHint: 'Please hold your phone over the 2- or 3-line MRZ code at the front of your passport.'
    };

    if (this.platform.is('ios')) {
      let widthPx = window.screen.width;
      config.finderWidth = widthPx * 0.9;
      config.finderHeight = widthPx * 0.18;
    }

    const result = await this.scanbot.SDK.UI.startMrzScanner({uiConfigs: config});
    if (result.status == 'OK') {
      const fields = result.mrzResult.fields.map(f => `<div>${f.name}: ${f.value} (${f.confidence.toFixed(2)})</div>`);
      this.uiService.showAlert(fields.join(''), 'MRZ Result');
    }
  }

}
