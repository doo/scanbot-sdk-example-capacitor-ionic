import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanbotsdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/services/scanbot.service';

@Component({
  selector: 'app-scanbotsdk-feature-images-from-pdf',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
})
export class ScanbotsdkFeatureImagesFromPdfComponent extends ScanbotsdkFeatureComponent {

  override feature = { id: FeatureId.ExtractImagesFromPdf, title: 'Extract Images from PDF' };

  override async featureClicked() {
    super.featureClicked();

    try {
      this.utils.showLoader();
      const result = await this.scanbot.extractImagesFromPdf();
      this.utils.dismissLoader();

      if (result.status === 'OK' && result.imageFilesUrls)
        this.utils.showResultInfo(JSON.stringify(result.imageFilesUrls, null, 2));
    } catch (e: any) {
      this.utils.dismissLoader();
      this.utils.showErrorAlert(e.message);
    }
  }
}
