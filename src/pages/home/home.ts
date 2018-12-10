import { Component } from '@angular/core';
import {
  NavController,
  Platform,
  AlertController
} from 'ionic-angular';

import ScanbotSDK, { Page, MrzScannerConfiguration } from 'cordova-plugin-scanbot-sdk';

import { ImageResultsPage } from "../image-results/image-results";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Add Scanbot SDK (trial) license key here.
  private myLicenseKey = "";

  private SBSDK = ScanbotSDK.promisify();

  public pages: Page[] = [];

  constructor(private navCtrl: NavController,
              private platform: Platform,
              private alertCtrl: AlertController) {
    this.platform.ready().then(() => this.initScanbotSDK());
  }

  private async initScanbotSDK() {
    await this.SBSDK.initializeSdk({
      loggingEnabled: true,
      licenseKey: this.myLicenseKey,
      storageImageFormat: 'JPG',
      storageImageQuality: 80
    }).then((result) => {
      console.log(result);
    }).catch((err) => {
      console.error(err);
    });
  }

  private async checkLicense() {
    const result = await this.SBSDK.isLicenseValid();
    if (result.isLicenseValid == true) {
      // OK - trial session, valid trial license or valid production license.
      return true;
    }
    this.showAlert("Scanbot SDK (trial) license has expired!");
    return false;
  }

  async startDocumentScanner() {
    if (!(await this.checkLicense())) { return; }

    const result = await this.SBSDK.UI.startDocumentScanner({
      uiConfigs: {
        // Customize colors, text resources, behavior, etc..
        cameraPreviewMode: 'FIT_IN',
        orientationLockMode: 'PORTRAIT',
        pageCounterButtonTitle: '%d Page(s)',
        multiPageEnabled: true
        // ...
      }
    });

    if (result.status === 'CANCELED') {
      // user has canceled the scanning operation
      return;
    }

    // Get the scanned pages from result:
    this.pages = result.pages;
  }

  async importImage() {
    if (!(await this.checkLicense())) { return; }
    // TODO
    // import an image from photo library and run auto doc-detection on it...
  }

  gotoImageResults() {
    this.navCtrl.push(ImageResultsPage);
  }

  async startBarcodeScanner() {
    if (!(await this.checkLicense())) { return; }

    const result = await this.SBSDK.UI.startBarcodeScanner({
      uiConfigs: {
        // Customize colors, text resources, behavior, etc..
        finderTextHint: 'Please align the barcode or QR code in the frame above to scan it.'
      }
    });

    if (result.status == 'OK') {
      this.showAlert(result.barcodeResult.textValue, `Barcode: ${result.barcodeResult.barcodeFormat}`);
    }
  }

  async startMrzScanner() {
    if (!(await this.checkLicense())) { return; }

    let config: MrzScannerConfiguration = {
      // Customize colors, text resources, etc..
      finderTextHint: 'Please hold your phone over the 2- or 3-line MRZ code at the front of your passport.'
    };

    if (this.platform.is('ios')) {
      let widthPx = window.screen.width;
      config.finderWidth = widthPx * 0.9;
      config.finderHeight = widthPx * 0.18;
    }

    const result = await this.SBSDK.UI.startMrzScanner({uiConfigs: config});
    if (result.status == 'OK') {
      const fields = result.mrzResult.fields.map(f => `<div>${f.name}: ${f.value} (${f.confidence.toFixed(2)})</div>`);
      this.showAlert(fields.join(''), 'MRZ Result');
    }
  }

  private showAlert(message: string, title: string = "Info") {
    const prompt = this.alertCtrl.create({
      title,
      message,
      buttons: [
        {
          text: 'OK',
        }
      ]
    });
    prompt.present();
  }



  // TODO remove
  convertFileUri(fileUri) {
    // see https://beta.ionicframework.com/docs/building/webview/
    return (<any>window).Ionic.WebView.convertFileSrc(fileUri);
  }

  // TODO remove
  async startCroppingScreen(page: Page) {
    const result = await this.SBSDK.UI.startCroppingScreen({
      page: page,
      uiConfigs: {
        // Customize colors, text resources, behavior, etc..
        doneButtonTitle: 'Save',
        orientationLockMode: 'PORTRAIT'
        // ...
      }
    });

    if (result.status == 'CANCELED') { return; }

    // handle the updated page object:
    this.updatePage(result.page);
  }

  // TODO remove
  private updatePage(page: Page) {
    let replaced = false;
    for (let i = 0; i < this.pages.length; ++i) {
      if (this.pages[i].pageId == page.pageId) {
        this.pages[i] = page;
        replaced = true;
        break;
      }
    }
    if (!replaced) {
      this.pages.push(page);
    }
  }

}
