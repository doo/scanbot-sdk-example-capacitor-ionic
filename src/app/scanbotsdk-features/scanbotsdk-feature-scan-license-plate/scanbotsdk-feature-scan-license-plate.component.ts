import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanbotsdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/services/scanbot.service';

@Component({
  selector: 'app-scanbotsdk-feature-scan-license-plate',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
})
export class ScanbotsdkFeatureScanLicensePlateComponent extends ScanbotsdkFeatureComponent {

  override async run() {
    try {
      const scanStrategy = this.feature.id == FeatureId.LicensePlateScannerML ? 'MlBased' : 'Classic';
      const result = await this.scanbot.scanLicensePlate(scanStrategy);

      if (result.status === 'OK')
        this.utils.showResultInfo(JSON.stringify(result));
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }
}
