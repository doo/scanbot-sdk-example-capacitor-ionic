import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import ScanbotSDK, { Page } from 'cordova-plugin-scanbot-sdk';

@Component({
  selector: 'page-image-results',
  templateUrl: 'image-results.html'
})
export class ImageResultsPage {

  private SBSDK = ScanbotSDK.promisify();

  // TODO manage pages in a global service/provider
  public pages: Page[] = [];

  constructor(public navCtrl: NavController, public platform: Platform) {
    //
  }

  convertFileUri(fileUri) {
    // see https://beta.ionicframework.com/docs/building/webview/
    return (<any>window).Ionic.WebView.convertFileSrc(fileUri);
  }

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

  async saveImages() {
    // TODO store images as PDF
    //this.SBSDK.createPdf(...)
  }

}
