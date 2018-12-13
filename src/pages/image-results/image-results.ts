import { Component } from '@angular/core';

import { NavController } from "ionic-angular";

import { Plugins } from '@capacitor/core';

import { ScanbotSdkProvider } from "../../providers/scanbot-sdk-provider";
import { ImageResultsProvider, SanitizedPage } from "../../providers/image-results-provider";
import { UiService } from "../../providers/ui-service";
import { ImageViewPage } from "../image-view/image-view";

const { Share } = Plugins;

@Component({
  selector: 'page-image-results',
  templateUrl: 'image-results.html'
})
export class ImageResultsPage {

  public pages: SanitizedPage[] = [];

  constructor(private navCtrl: NavController,
              private scanbot: ScanbotSdkProvider,
              private imageResultsProvider: ImageResultsProvider,
              private uiService: UiService
  ) {
    this.reloadPages();
  }

  private reloadPages() {
    this.pages = this.imageResultsProvider.getPages();
  }

  gotoImageView(page: SanitizedPage) {
    this.navCtrl.push(ImageViewPage, {page: page});
  }

  async saveAsPdf() {
    if (!(await this.scanbot.checkLicense())) { return; }
    if (!this.checkImages()) { return; }

    const loading = this.uiService.createLoading('Creating PDF ...');
    try {
      loading.present();
      const result = await this.scanbot.SDK.createPdf({
        images: this.pages.map(p => p.documentImageFileUri)
      });

      //this.uiService.showAlert(result.pdfFileUri, "PDF created");
      Share.share({url: result.pdfFileUri});
    }
    finally {
      loading.dismiss();
    }
  }

  private checkImages(): boolean {
    if (this.pages.length > 0) {
      return true;
    }
    this.uiService.showAlert(
      "Please scan some images via Document Scanner or import from Photo Library.",
      "Images Required");
    return false;
  }

  async addScan() {
    if (!(await this.scanbot.checkLicense())) { return; }

    const configs = this.scanbot.globalDocScannerConfigs();
    // for demo purposes we want to add only one page here.
    configs.multiPageEnabled = false;
    configs.multiPageButtonHidden = true;

    const result = await this.scanbot.SDK.UI.startDocumentScanner({uiConfigs: configs});

    if (result.status === 'CANCELED') { return; }

    this.imageResultsProvider.addPages(result.pages);
    this.reloadPages();
  }

  async removeAll() {
    await this.scanbot.SDK.cleanup();
    this.imageResultsProvider.removeAll();
    this.reloadPages();
  }

}
