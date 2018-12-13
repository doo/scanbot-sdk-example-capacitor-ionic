import { Component } from '@angular/core';

import { ActionSheetButton, ActionSheetController, NavController, NavParams } from "ionic-angular";

import { ImageFilter, Page } from 'cordova-plugin-scanbot-sdk';

import { ScanbotSdkProvider } from "../../providers/scanbot-sdk-provider";
import { ImageResultsProvider, SanitizedPage } from "../../providers/image-results-provider";
import { UiService } from "../../providers/ui-service";

@Component({
  selector: 'page-image-view',
  templateUrl: 'image-view.html'
})
export class ImageViewPage {

  public page: SanitizedPage;

  private imageFilterList: ImageFilter[] = [
    "NONE",
    "COLOR_ENHANCED",
    "GRAYSCALE",
    "BINARIZED",
    "COLOR_DOCUMENT",
    "PURE_BINARIZED",
    "BACKGROUND_CLEAN",
    "BLACK_AND_WHITE"
  ];

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private actionSheetCtrl: ActionSheetController,
              private scanbot: ScanbotSdkProvider,
              private imageResultsProvider: ImageResultsProvider,
              private uiService: UiService
  ) {
    this.page = this.navParams.data.page;
  }

  async startCroppingScreen() {
    if (!(await this.scanbot.checkLicense())) { return; }

    const result = await this.scanbot.SDK.UI.startCroppingScreen({
      page: this.page as Page,
      uiConfigs: {
        // Customize colors, text resources, behavior, etc..
        doneButtonTitle: 'Save',
        orientationLockMode: 'PORTRAIT'
        // ...
      }
    });

    if (result.status == 'CANCELED') { return; }

    this.updatePage(result.page);
  }

  async deletePage() {
    await this.scanbot.SDK.removePage({page: this.page as Page});
    this.imageResultsProvider.removePage(this.page);
    this.navCtrl.pop();
  }

  private updatePage(page: Page) {
    this.page = this.imageResultsProvider.updatePage(page);
  }

  showFilterSelection() {
    const filterButtons: ActionSheetButton[] = [];
    this.imageFilterList.forEach(f => {
      filterButtons.push({
          text: f,
          handler: () => { this.applyImageFilter(f); }
      });
    });

    const actionSheet = this.actionSheetCtrl.create({
      title: 'Select an Image Filter',
      buttons: filterButtons
    });
    actionSheet.present();
  }

  private async applyImageFilter(filter: ImageFilter) {
    if (!(await this.scanbot.checkLicense())) { return; }

    const loading = this.uiService.createLoading('Applying image filter ...');
    try {
      loading.present();

      const result = await this.scanbot.SDK.applyImageFilterOnPage({page: this.page as Page, imageFilter: filter});
      this.updatePage(result.page);
    }
    finally {
      loading.dismiss();
    }
  }

}
