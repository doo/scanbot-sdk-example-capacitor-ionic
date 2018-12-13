import { Injectable } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

import { Page } from 'cordova-plugin-scanbot-sdk';


@Injectable()
export class ImageResultsProvider {

  private pages: SanitizedPage[] = [];

  constructor(public sanitizer: DomSanitizer) { }

  getPages(): SanitizedPage[] {
    return this.pages;
  }

  addPages(pages: Page[]) {
    const spages: SanitizedPage[] = [];
    pages.forEach((p) => {
      spages.push(this.sanitizePage(p));
    });
    this.pages = this.pages.concat(spages);
  }

  updatePage(page: Page): SanitizedPage {
    const sp = this.sanitizePage(page);
    let replaced = false;
    for (let i = 0; i < this.pages.length; ++i) {
      if (this.pages[i].pageId == sp.pageId) {
        this.pages[i] = sp;
        replaced = true;
        break;
      }
    }
    if (!replaced) {
      this.pages.push(sp);
    }
    return sp;
  }

  removePage(page: SanitizedPage) {
    const index = this.pages.findIndex(p => p.pageId == page.pageId);
    if (index > -1) {
      this.pages.splice(index, 1);
    }
  }

  removeAll() {
    this.pages = [];
  }

  private sanitizePage(page: Page): SanitizedPage {
    // !! see https://beta.ionicframework.com/docs/building/webview/
    let url = (<any>window).Ionic.WebView.convertFileSrc(page.documentPreviewImageFileUri);

    // !! see https://angular.io/guide/security#xss
    url = this.sanitizer.bypassSecurityTrustUrl(url);

    const sp: SanitizedPage = page as SanitizedPage;
    sp.sanitizedDocumentPreviewImage = url;

    return sp;
  }

}

export interface SanitizedPage extends Page {
  sanitizedDocumentPreviewImage: string;
}
