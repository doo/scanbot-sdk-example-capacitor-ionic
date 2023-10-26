import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';

import { CommonUtils } from '../utils/common-utils';

import { Feature, FeatureId, ScanbotService } from '../services/scanbot.service';
import { ScanbotsdkFeatureDocumentScannerComponent } from '../scanbotsdk-features/scanbotsdk-feature-document-scanner/scanbotsdk-feature-document-scanner.component';
import { ScanbotsdkFeatureDocumentScannerWithFinderComponent } from '../scanbotsdk-features/scanbotsdk-feature-document-scanner-with-finder/scanbotsdk-feature-document-scanner-with-finder.component';
import { ScanbotsdkFeatureDocumentFromPageComponent } from '../scanbotsdk-features/scanbotsdk-feature-document-from-page/scanbotsdk-feature-document-from-page.component';
import { ScanbotsdkFeatureDocumentFromImageComponent } from '../scanbotsdk-features/scanbotsdk-feature-document-from-image/scanbotsdk-feature-document-from-image.component';
import { ScanbotsdkFeaturePagesFromPdfComponent } from '../scanbotsdk-features/scanbotsdk-feature-pages-from-pdf/scanbotsdk-feature-pages-from-pdf.component';
import { ScanbotsdkFeatureImagesFromPdfComponent } from '../scanbotsdk-features/scanbotsdk-feature-images-from-pdf/scanbotsdk-feature-images-from-pdf.component';
import { ScanbotsdkFeatureScanBarcodesComponent } from '../scanbotsdk-features/scanbotsdk-feature-scan-barcodes/scanbotsdk-feature-scan-barcodes.component';
import { ScanbotsdkFeatureScanBatchBarcodesComponent } from '../scanbotsdk-features/scanbotsdk-feature-scan-batch-barcodes/scanbotsdk-feature-scan-batch-barcodes.component';
import { ScanbotsdkFeatureBarcodesOnStillImageComponent } from '../scanbotsdk-features/scanbotsdk-feature-barcodes-on-still-image/scanbotsdk-feature-barcodes-on-still-image.component';
import { ScanbotsdkFeatureBarcodesOnStillImagesComponent } from '../scanbotsdk-features/scanbotsdk-feature-barcodes-on-still-images/scanbotsdk-feature-barcodes-on-still-images.component';
import { ScanbotsdkFeatureScanMrzComponent } from '../scanbotsdk-features/scanbotsdk-feature-scan-mrz/scanbotsdk-feature-scan-mrz.component';
import { ScanbotsdkFeatureScanMedicalCertComponent } from '../scanbotsdk-features/scanbotsdk-feature-scan-medical-cert/scanbotsdk-feature-scan-medical-cert.component';
import { ScanbotsdkFeatureScanGenericDocComponent } from '../scanbotsdk-features/scanbotsdk-feature-scan-generic-doc/scanbotsdk-feature-scan-generic-doc.component';
import { ScanbotsdkFeatureScanCheckComponent } from '../scanbotsdk-features/scanbotsdk-feature-scan-check/scanbotsdk-feature-scan-check.component';
import { ScanbotsdkFeatureScanEhicComponent } from '../scanbotsdk-features/scanbotsdk-feature-scan-ehic/scanbotsdk-feature-scan-ehic.component';
import { ScanbotsdkFeatureScanLicensePlateComponent } from '../scanbotsdk-features/scanbotsdk-feature-scan-license-plate/scanbotsdk-feature-scan-license-plate.component';
import { ScanbotsdkFeatureScanTextDataComponent } from '../scanbotsdk-features/scanbotsdk-feature-scan-text-data/scanbotsdk-feature-scan-text-data.component';
import { ScanbotsdkFeatureRecognizeCheckOnImageComponent } from '../scanbotsdk-features/scanbotsdk-feature-recognize-check-on-image/scanbotsdk-feature-recognize-check-on-image.component';
import { ScanbotsdkFeatureApplyFilterOnImageComponent } from '../scanbotsdk-features/scanbotsdk-feature-apply-filter-on-image/scanbotsdk-feature-apply-filter-on-image.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink,
    ScanbotsdkFeatureDocumentScannerComponent,
    ScanbotsdkFeatureDocumentScannerWithFinderComponent,
    ScanbotsdkFeatureDocumentFromPageComponent,
    ScanbotsdkFeatureDocumentFromImageComponent,
    ScanbotsdkFeaturePagesFromPdfComponent,
    ScanbotsdkFeatureImagesFromPdfComponent,
    ScanbotsdkFeatureScanBarcodesComponent,
    ScanbotsdkFeatureScanBatchBarcodesComponent,
    ScanbotsdkFeatureBarcodesOnStillImageComponent,
    ScanbotsdkFeatureBarcodesOnStillImagesComponent,
    ScanbotsdkFeatureScanMrzComponent,
    ScanbotsdkFeatureScanMedicalCertComponent,
    ScanbotsdkFeatureScanGenericDocComponent,
    ScanbotsdkFeatureScanCheckComponent,
    ScanbotsdkFeatureScanEhicComponent,
    ScanbotsdkFeatureScanLicensePlateComponent,
    ScanbotsdkFeatureScanTextDataComponent,
    ScanbotsdkFeatureRecognizeCheckOnImageComponent,
    ScanbotsdkFeatureApplyFilterOnImageComponent
  ],
})

export class HomePage implements OnInit {

  private scanbot = inject(ScanbotService);
  private utils = inject(CommonUtils);
  private router = inject(Router);

  readonly featureScanLicensePlateMLBased: Feature = { id: FeatureId.LicensePlateScannerML, title: 'Scan Vehicle License Plate (ML Based)' };
  readonly featureScanLicensePlateClassic: Feature = { id: FeatureId.LicensePlateScannerClassic, title: 'Scan Vehicle License Plate (Classic)' };

  readonly currentYear = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
    this.scanbot.initializeSDK();
  }

  async showLicenseInfo() {
    try {
      this.utils.showLicenseInfo(await this.scanbot.getLicenseInfo());
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }

  async showOCRConfigs() {
    try {
      if (await this.scanbot.isLicenseValid())
        this.utils.showOCRConfigs(await this.scanbot.getOCRConfigs());
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }

  async showBarcodeFormatsScreen() {
    if (await this.scanbot.isLicenseValid())
      this.router.navigate(['/barcode-formats']);
  }

  async showBarcodeDocumentFormatsScreen() {
    if (await this.scanbot.isLicenseValid())
      this.router.navigate(['/barcode-document-formats']);
  }
}
