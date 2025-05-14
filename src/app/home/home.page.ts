import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

import { CommonUtils } from '../utils/common-utils';
import { ScanbotUtils } from '../utils/scanbot-utils';

import { AnalyzeDocumentQualityFeature } from '../scanbotsdk-features/analyze-document-quality-feature.component';
import { ExtractDocumentDataFromImageFeature } from '../scanbotsdk-features/data-detectors-on-image/extract-document-from-image.component';
import { RecognizeCheckOnImageFeature } from '../scanbotsdk-features/data-detectors-on-image/recognize-check-on-image-feature.component';
import { RecognizeCreditCardOnImageFeature } from '../scanbotsdk-features/data-detectors-on-image/recognize-credit-card-on-image-feature.component';
import { RecognizeEhicOnImageFeature } from '../scanbotsdk-features/data-detectors-on-image/recognize-ehic-on-image-feature.component';
import { RecognizeMedicalCertificateOnImageFeature } from '../scanbotsdk-features/data-detectors-on-image/recognize-medical-certificate-on-image-feature.component';
import { RecognizeMrzOnImageFeature } from '../scanbotsdk-features/data-detectors-on-image/recognize-mrz-on-image-feature.component';
import { CreateDocumentFromGalleryComponent } from '../scanbotsdk-features/document-scanner/create-document-from-image.component';
import { RtuMultiPageScanningComponent } from '../scanbotsdk-features/document-scanner/rtu-multi-page-scanning.component';
import { RtuSinglePageScanningComponentWithFinder } from '../scanbotsdk-features/document-scanner/rtu-single-page-scanning-with-finder.component';
import { RtuSinglePageScanningComponent } from '../scanbotsdk-features/document-scanner/rtu-single-page-scanning.component';
import { PerformOcrOnImageFeature } from '../scanbotsdk-features/perform-ocr-on-image-feature.component';
import { RtuCheckScannerFeature } from '../scanbotsdk-features/rtu-data-detectors/rtu-check-scanner-feature.component';
import { RtuCreditCardScannerFeature } from '../scanbotsdk-features/rtu-data-detectors/rtu-credit-card-scanner-feature.component';
import { RtuDocumentDataExtractorFeature } from '../scanbotsdk-features/rtu-data-detectors/rtu-document-data-extractor-feature.component';
import { RtuHealthInsuranceCardScannerFeature } from '../scanbotsdk-features/rtu-data-detectors/rtu-health-insurance-card-scanner-feature.component';
import { RtuMedicalCertificateScannerFeature } from '../scanbotsdk-features/rtu-data-detectors/rtu-medical-certificate-scanner-feature.component';
import { RtuMrzScannerFeature } from '../scanbotsdk-features/rtu-data-detectors/rtu-mrz-scanner-feature.component';
import { RtuTextPatternScannerFeature } from '../scanbotsdk-features/rtu-data-detectors/rtu-text-pattern-scanner-feature.component';
import { RtuVinScannerComponent } from '../scanbotsdk-features/rtu-data-detectors/rtu-vin-scanner.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

  imports: [
    IonicModule,
    CommonModule,
    RtuSinglePageScanningComponent,
    RtuSinglePageScanningComponentWithFinder,
    RtuMultiPageScanningComponent,
    CreateDocumentFromGalleryComponent,
    RtuMrzScannerFeature,
    RtuMedicalCertificateScannerFeature,
    RtuCheckScannerFeature,
    RtuHealthInsuranceCardScannerFeature,
    RtuVinScannerComponent,
    RtuCreditCardScannerFeature,
    RtuTextPatternScannerFeature,
    RtuDocumentDataExtractorFeature,
    RecognizeCheckOnImageFeature,
    RecognizeMrzOnImageFeature,
    RecognizeMedicalCertificateOnImageFeature,
    RecognizeEhicOnImageFeature,
    RecognizeCreditCardOnImageFeature,
    ExtractDocumentDataFromImageFeature,
    AnalyzeDocumentQualityFeature,
    PerformOcrOnImageFeature,
  ],
})
export class HomePage {
  private scanbotUtils = inject(ScanbotUtils);
  private utils = inject(CommonUtils);

  readonly currentYear = new Date().getFullYear();

  constructor() {}

  async showLicenseInfo() {
    try {
      this.utils.showLicenseInfo(await ScanbotSDK.getLicenseInfo());
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }

  async showOCRConfigs() {
    try {
      // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
      if (await this.isLicenseValid()) {
        this.utils.showOCRConfigs(await ScanbotSDK.getOCRConfigs());
      }
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }

  async cleanup() {
    try {
      // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
      if (await this.isLicenseValid()) {
        await ScanbotSDK.cleanup();
        this.utils.showInfoAlert('Storage has been cleared !');
      }
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }

  private async isLicenseValid(): Promise<boolean> {
    const licenseInfo = await ScanbotSDK.getLicenseInfo();

    if (licenseInfo.isLicenseValid) {
      // We have a valid (trial) license and can call other Scanbot SDK methods.
      // E.g. launch the Document Scanner
      return true;
    } else {
      // The license is not valid. We will return false and show the status
      this.utils.showWarningAlert(licenseInfo.licenseStatusMessage ?? 'Invalid License');
      return false;
    }
  }
}
