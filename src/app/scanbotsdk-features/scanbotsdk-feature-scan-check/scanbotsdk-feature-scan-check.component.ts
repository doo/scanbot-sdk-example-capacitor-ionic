import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanbotsdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/services/scanbot.service';

@Component({
  selector: 'app-scanbotsdk-feature-scan-check',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
})
export class ScanbotsdkFeatureScanCheckComponent extends ScanbotsdkFeatureComponent {

  override feature = { id: FeatureId.CheckRecognizer, title: 'Scan Check' };

  override async featureClicked() {
    super.featureClicked();

    try {
      const result = await this.scanbot.scanCheck();

      if (result.checkStatus === 'SUCCESS') {
        const checkResultAsJson = JSON.stringify(result);

        console.log(checkResultAsJson);
        this.router.navigate(['/checkResult', checkResultAsJson])
      }
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }
}