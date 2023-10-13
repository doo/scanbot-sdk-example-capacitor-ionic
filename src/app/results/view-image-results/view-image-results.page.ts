import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, Platform } from '@ionic/angular';
import { PreferencesUtils } from 'src/app/utils/preferences-utils';
import { Page } from 'capacitor-plugin-scanbot-sdk';
import { Capacitor } from '@capacitor/core';

interface ImageResult {
  page: Page,
  pagePreviewWebViewPath: string
}

@Component({
  selector: 'app-view-image-results',
  templateUrl: './view-image-results.page.html',
  styleUrls: ['./view-image-results.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewImageResultsPage implements OnInit {///TODO implement this
  private platform = inject(Platform);
  private preferencesUtils = inject(PreferencesUtils);

  imageResults: ImageResult[] = new Array<ImageResult>;

  constructor() { }

  async ngOnInit() {
    (await this.preferencesUtils.getAllPagesFromPrefs()).forEach(p => {
      if (p.documentPreviewImageFileUri!!)
        this.imageResults.push({ page: p, pagePreviewWebViewPath: Capacitor.convertFileSrc(p.documentPreviewImageFileUri) })
    });
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Home' : '';
  }
}
