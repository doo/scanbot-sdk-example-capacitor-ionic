import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import ScanbotSDK from 'cordova-plugin-scanbot-sdk';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private SBSDK = ScanbotSDK.promisify();

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

}
