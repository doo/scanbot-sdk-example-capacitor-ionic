import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanbotsdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/services/scanbot.service';

@Component({
  selector: 'app-scanbotsdk-feature-scan-ehic',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
})
export class ScanbotsdkFeatureScanEhicComponent extends ScanbotsdkFeatureComponent {

  override feature = { id: FeatureId.ScanEHIC, title: 'Scan Health Insurance Card' };

  override async run() {
    try {
      const result = await this.scanbot.scanEHIC();

      if (result.status === 'OK') {
        const fields = result.fields.map(
          f => `${f.type}: ${f.value} (${f.confidence.toFixed(2)})`,
        );

        this.utils.showResultInfo(fields.join('\n'));
      }
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }
}
