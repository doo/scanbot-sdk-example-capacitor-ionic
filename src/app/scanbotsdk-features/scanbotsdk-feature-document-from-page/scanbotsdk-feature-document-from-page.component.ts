import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanbotsdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/services/scanbot.service';

@Component({
  selector: 'app-scanbotsdk-feature-document-from-page',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
})
export class ScanbotsdkFeatureDocumentFromPageComponent extends ScanbotsdkFeatureComponent {

  override feature = { id: FeatureId.DetectDocumentFromPage, title: 'Import Image & Detect Document' };

  override async featureClicked() {
    super.featureClicked();

    try {
      this.utils.showLoader();
      const page = await this.scanbot.detectDocumentFromPage();

      await this.preferencesUtils.savePage(page);
      this.utils.dismissLoader();

      this.router.navigate(['/imageResults'])
    } catch (e: any) {
      this.utils.dismissLoader();
      this.utils.showErrorAlert(e.message);
    }
  }
}
