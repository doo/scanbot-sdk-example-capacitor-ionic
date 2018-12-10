import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import ScanbotSDK, { Page } from 'cordova-plugin-scanbot-sdk';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private SBSDK = ScanbotSDK.promisify();

  public pages: Page[] = [];

  constructor(public navCtrl: NavController, platform: Platform) {
    platform.ready().then(() => this.initScanbotSDK());
  }

  private async initScanbotSDK() {
    await this.SBSDK.initializeSdk({
      loggingEnabled: true,
      licenseKey: '', // see the license key notes!
      storageImageFormat: 'JPG',
      storageImageQuality: 80
    }).then((result) => {
      console.log(result);
    }).catch((err) => {
      console.error(err);
    });
  }

  async startDocumentScanner() {
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

  convertFileUri(fileUri) {
    return (<any>window).Ionic.WebView.convertFileSrc(fileUri);
  }

}
