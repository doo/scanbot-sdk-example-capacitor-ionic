import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanbotsdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/services/scanbot.service';

@Component({
  selector: 'app-scanbotsdk-feature-pages-from-pdf',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
})
export class ScanbotsdkFeaturePagesFromPdfComponent extends ScanbotsdkFeatureComponent {

  override feature = { id: FeatureId.ExtractPagesFromPdf, title: 'Extract pages from PDF' };

  override async featureClicked() {
    super.featureClicked();

    try {
      this.utils.showLoader();
      const result = await this.scanbot.extractPagesFromPdf();
      this.utils.dismissLoader();

      if (result.status === 'OK' && result.pages) {
        await this.preferencesUtils.savePages(result.pages);

        this.router.navigate(['/imageResults'])
      }
    } catch (e: any) {
      await this.utils.dismissLoader();
      this.utils.showErrorAlert(e.message);
    }
  }
}
