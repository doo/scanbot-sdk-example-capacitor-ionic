import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/services/scanbot.service';

@Component({
    selector: 'app-scanbotsdk-feature-barcodes-on-still-image',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
    })
export class DetectBarcodesOnImageFeature extends ScanbotSdkFeatureComponent {

  override feature = { id: FeatureId.DetectBarcodesOnStillImage, title: 'Import Image & Detect Barcodes' };

  override async run() {
      try {
          this.utils.showLoader();
          const result = await this.scanbot.detectBarcodesOnImage();
          await this.utils.dismissLoader();

          if (result.barcodes.length > 0) {
              this.utils.showResultInfo(JSON.stringify(result.barcodes));
          } else {
              this.utils.showInfoAlert('No barcodes detected');
          }
      } catch (e: any) {
          await this.utils.dismissLoader();
          this.utils.showErrorAlert(e.message);
      }
  }
}
