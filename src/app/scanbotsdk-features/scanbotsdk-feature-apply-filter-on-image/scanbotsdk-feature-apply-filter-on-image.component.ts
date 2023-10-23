import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanbotsdkFeatureComponent } from '../scanbotsdk-feature.component';
import { Feature, FeatureId } from 'src/app/services/scanbot.service';

@Component({
  selector: 'app-scanbotsdk-feature-apply-filter-on-image',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
})
export class ScanbotsdkFeatureApplyFilterOnImageComponent extends ScanbotsdkFeatureComponent {

  override feature: Feature = { id: FeatureId.ApplyFilterOnImage, title: 'Import Image and Apply Filter' };

  override async featureClicked() {
    super.featureClicked();

    try {
      const result = await this.scanbot.applyFilterOnImage({ showLoader: true });
      const filteredImageUri = result?.imageFileUri;

      if (filteredImageUri) {
        const page = await this.scanbot.detectDocumentFromPage(filteredImageUri);

        await this.preferencesUtils.savePage(page);
        this.utils.dismissLoader();

        this.router.navigate(['/image-results'])
      }
      else
        this.utils.dismissLoader();
    } catch (e: any) {
      await this.utils.dismissLoader();
      this.utils.showErrorAlert(e.message);
    }
  }
}
