import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

import ScanbotSdk, {DocumentScannerConfiguration, ScanbotSDKConfiguration} from 'cordova-plugin-scanbot-sdk';

import { UiService } from "./ui-service";


// Get a Scanbot SDK trial license key on https://scanbot.io/sdk/trial.html
// and add it here:
const myLicenseKey = '';
/*
 * Please note: The Scanbot SDK will run without a licenseKey for one minute per session!
 * After the trial period is over all Scanbot SDK functions as well as the UI components will stop working
 * or may be terminated. You can get an unrestricted "no-strings-attached" 30 day trial license key for free.
 * Please submit the trial license form (https://scanbot.io/sdk/trial.html) on our website by using
 * the app identifier of this example app: "io.scanbot.example.sdk.capacitor.ionic".
 */


@Injectable()
export class ScanbotSdkProvider {

  public SDK = ScanbotSdk.promisify();

  private _promise: Promise<any>;
  private _error: any;
  private _result: any;

  constructor(platform: Platform, private uiService: UiService) {
    this._promise = platform.ready().then(() => this.initScanbotSdk());
  }

  private initScanbotSdk() {
    const config: ScanbotSDKConfiguration = {
      loggingEnabled: true, // Consider switching logging OFF in production builds for security and performance reasons!
      licenseKey: myLicenseKey,
      storageImageFormat: 'JPG',
      storageImageQuality: 80
    };

    return this.SDK.initializeSdk(config).then(result => {
      this._promise = null;
      console.log(JSON.stringify(result));
    }).catch((err) => {
      console.error(JSON.stringify(err));
    });
  }

  public onInitialize(callback: (err, result) => void) {
    if (this._promise) {
      this._promise = this._promise
        .then(result => {
          this._result = result;
          callback(null, result);
        }).catch(err => {
          this._error = err;
          callback(err, null);
        });
    } else {
      callback(this._error, this._result);
    }
  }

  public async checkLicense() {
    const result = await this.SDK.isLicenseValid();
    if (result.isLicenseValid == true) {
      // OK - trial session, valid trial license or valid production license.
      return true;
    }
    this.uiService.showAlert("Scanbot SDK (trial) license has expired!");
    return false;
  }

  public globalDocScannerConfigs(): DocumentScannerConfiguration {
    return {
      // Customize colors, text resources, behavior, etc..
      cameraPreviewMode: 'FIT_IN',
      orientationLockMode: 'PORTRAIT',
      pageCounterButtonTitle: '%d Page(s)',
      multiPageEnabled: true
      // ...
    };
  }

}
