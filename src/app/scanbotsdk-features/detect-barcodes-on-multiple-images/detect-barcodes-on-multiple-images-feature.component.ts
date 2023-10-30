import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/services/scanbot.service';

@Component({
    selector: 'app-scanbotsdk-feature-barcodes-on-still-images',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
    })
export class DetectBarcodesOnMultipleImagesFeature extends ScanbotSdkFeatureComponent {

  override feature = { id: FeatureId.DetectBarcodesOnStillImages, title: 'Import Multiple Images & Detect Barcodes' };

  override async run() {
      try {
          this.utils.showLoader();
          const result = await this.scanbot.detectBarcodesOnMultipleImages();
          await this.utils.dismissLoader();

          if (result.results.length > 0) {
              this.utils.showResultInfo(JSON.stringify(result.results));
          } else {
              this.utils.showInfoAlert('No barcodes detected');
          }
      } catch (e: any) {
          await this.utils.dismissLoader();
          this.utils.showErrorAlert(e.message);
      }
  }
}
