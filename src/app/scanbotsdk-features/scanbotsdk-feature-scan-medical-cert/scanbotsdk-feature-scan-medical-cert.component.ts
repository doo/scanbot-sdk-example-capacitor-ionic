import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanbotsdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/services/scanbot.service';

@Component({
  selector: 'app-scanbotsdk-feature-scan-medical-cert',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
})
export class ScanbotsdkFeatureScanMedicalCertComponent extends ScanbotsdkFeatureComponent {

  override feature = { id: FeatureId.ScanMedicalCertificate, title: 'Scan Medical Certificate' };

  override async featureClicked() {
    super.featureClicked();

    try {
      const result = await this.scanbot.scanMedicalCertificate();

      if (result.status === 'OK') {
        const medicalCertResultAsJson = JSON.stringify(result);

        console.log(medicalCertResultAsJson);
        this.router.navigate(['/medical-certificate-result-fields', medicalCertResultAsJson])
      }
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }
}
