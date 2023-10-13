import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanbotsdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/services/scanbot.service';

@Component({
  selector: 'app-scanbotsdk-feature-document-scanner',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
})
export class ScanbotsdkFeatureDocumentScannerComponent extends ScanbotsdkFeatureComponent {

  override feature = { id: FeatureId.DocumentScanner, title: 'Scan Document' };

  override async featureClicked() {
    super.featureClicked();

    try {
      const documentResult = await this.scanbot.scanDocument();

      if (documentResult.status === 'OK') {
        await this.preferencesUtils.savePages(documentResult.pages);

        this.router.navigate(['/imageResults'])
      }
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }
}
