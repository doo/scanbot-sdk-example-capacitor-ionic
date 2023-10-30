import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/services/scanbot.service';

@Component({
    selector: 'app-scanbotsdk-feature-document-from-image',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
    })
export class DetectDocumentOnImageFeature extends ScanbotSdkFeatureComponent {

  override feature = { id: FeatureId.DetectDocumentFromImage, title: 'Import Image & Detect Document (JSON)' };

  override async run() {
      try {
          const imageFileUri = (await this.imageUtils.selectImagesFromLibrary())[0];

          await this.utils.showLoader();
          const result = await this.scanbot.detectDocumentFromImage(imageFileUri);
          const blur = await this.scanbot.estimateBlur(imageFileUri);
          await this.utils.dismissLoader();

          this.utils.showResultInfo(JSON.stringify(result) + '\n' + JSON.stringify(blur, null, 2));
      } catch (e: any) {
          await this.utils.dismissLoader();
          this.utils.showErrorAlert(e.message);
      }
  }
}
