import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanbotsdkFeatureComponent } from '../scanbotsdk-feature.component';
import { Feature, FeatureId } from 'src/app/services/scanbot.service';

@Component({
  selector: 'app-scanbotsdk-feature-recognize-check-on-image',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
})
export class ScanbotsdkFeatureRecognizeCheckOnImageComponent extends ScanbotsdkFeatureComponent {

  override feature: Feature = { id: FeatureId.RecognizeCheckOnImage, title: 'Import Image and Recognize Check' };

  override async featureClicked() {
    super.featureClicked();

    try {
      this.utils.showLoader();
      const result = await this.scanbot.scanCheckFromImage();
      this.utils.dismissLoader();

      if (result.checkStatus === 'SUCCESS') {
        const checkResultAsJson = JSON.stringify(result);

        console.log(checkResultAsJson);
        this.router.navigate(['/checkResult', checkResultAsJson])
      }
    } catch (e: any) {
      await this.utils.dismissLoader();
      this.utils.showErrorAlert(e.message);
    }
  }
}