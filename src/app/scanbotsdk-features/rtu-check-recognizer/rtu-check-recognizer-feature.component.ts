import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/services/scanbot.service';

@Component({
    selector: 'app-scanbotsdk-feature-scan-check',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
    })
export class RtuCheckRecognizerFeature extends ScanbotSdkFeatureComponent {

  override feature = { id: FeatureId.CheckRecognizer, title: 'Scan Check' };

  override async run() {
      try {
          const result = await this.scanbot.scanCheck();

          if (result.checkStatus === 'SUCCESS') {
              const checkResultAsJson = JSON.stringify(result);

              console.log(checkResultAsJson);
              this.router.navigate(['/check-result-fields', checkResultAsJson]);
          }
      } catch (e: any) {
          this.utils.showErrorAlert(e.message);
      }
  }
}
