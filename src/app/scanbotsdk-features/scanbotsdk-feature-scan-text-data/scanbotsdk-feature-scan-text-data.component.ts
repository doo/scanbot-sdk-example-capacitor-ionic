import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanbotsdkFeatureComponent } from '../scanbotsdk-feature.component';
import { Feature, FeatureId } from 'src/app/services/scanbot.service';

@Component({
    selector: 'app-scanbotsdk-feature-scan-text-data',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
    })
export class ScanbotsdkFeatureScanTextDataComponent extends ScanbotsdkFeatureComponent {

  override feature: Feature = { id: FeatureId.TextDataScanner, title: 'Start Text Data Scanner' };

  override async run() {
      try {
          const result = await this.scanbot.scanTextData();

          if (result.status === 'OK') {
              if (result.result?.text) {
                  this.utils.showResultInfo(JSON.stringify(result));
              } else {
                  this.utils.showInfoAlert('No data founded');
              }
          }
      } catch (e: any) {
          this.utils.showErrorAlert(e.message);
      }
  }
}
