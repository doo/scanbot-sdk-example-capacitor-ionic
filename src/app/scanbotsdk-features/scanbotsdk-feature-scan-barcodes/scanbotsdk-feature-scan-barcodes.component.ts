import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanbotsdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/services/scanbot.service';

@Component({
  selector: 'app-scanbotsdk-feature-scan-barcodes',
  templateUrl: '../scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
})
export class ScanbotsdkFeatureScanBarcodesComponent extends ScanbotsdkFeatureComponent {

  override feature = { id: FeatureId.ScanBarcodes, title: 'Scan QR-/Barcode' };

  override async featureClicked() {
    super.featureClicked();

    try {
      //doesn't return anything on cancel or back button (android only)
      const barcodeResult = await this.scanbot.scanBarcode();

      if (barcodeResult.status === 'OK' && barcodeResult.barcodes) {
        this.utils.logBarcodeDocument(barcodeResult.barcodes[0]);
        this.utils.showResultInfo(JSON.stringify(barcodeResult.barcodes));
      }
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }
}