import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CommonUtils } from '../utils/common-utils';
import { ScanbotUtils } from '../utils/scanbot-utils';

import { AnalyzeDocumentQualityFeature } from '../scanbotsdk-features/analyze-document-quality/analyze-document-quality-feature.component';
import { ApplyFilterOnImageFeature } from '../scanbotsdk-features/apply-filter-on-image/apply-filter-on-image-feature.component';
import { DetectBarcodesOnImageFeature } from '../scanbotsdk-features/detect-barcodes-on-image/detect-barcodes-on-image-feature.component';
import { DetectDocumentOnImageFeature } from '../scanbotsdk-features/detect-document-on-image/detect-document-on-image-feature.component';
import { DetectDocumentOnPageFeature } from '../scanbotsdk-features/detect-document-on-page/detect-document-on-page-feature.component';
import { ExtractImagesFromPdfFeature } from '../scanbotsdk-features/extract-images-from-pdf/extract-images-from-pdf-feature.component';
import { ExtractPagesFromPdfFeature } from '../scanbotsdk-features/extract-pages-from-pdf/extract-pages-from-pdf-feature.component';
import { LegacyRtuBarcodeScannerFeature } from '../scanbotsdk-features/legacy-rtu-barcode-scanner/legacy-rtu-barcode-scanner-feature.component';
import { LegacyRtuBatchBarcodeScannerFeature } from '../scanbotsdk-features/legacy-rtu-batch-barcode-scanner/legacy-rtu-batch-barcode-scanner-feature.component';
import { PerformOcrOnImageFeature } from '../scanbotsdk-features/perform-ocr-on-image/perform-ocr-on-image-feature.component';
import { RecognizeCheckOnImageFeature } from '../scanbotsdk-features/recognize-check-on-image/recognize-check-on-image-feature.component';
import { RecognizeEhicOnImageFeature } from '../scanbotsdk-features/recognize-ehic-on-image/recognize-ehic-on-image-feature.component';
import { RecognizeGenericDocumentOnImageFeature } from '../scanbotsdk-features/recognize-generic-document-on-image/recognize-generic-document-on-image-feature.component';
import { RecognizeMedicalCertificateOnImageFeature } from '../scanbotsdk-features/recognize-medical-certificate-on-image/recognize-medical-certificate-on-image-feature.component';
import { RecognizeMrzOnImageFeature } from '../scanbotsdk-features/recognize-mrz-on-image/recognize-mrz-on-image-feature.component';
import { RtuCheckRecognizerFeature } from '../scanbotsdk-features/rtu-check-recognizer/rtu-check-recognizer-feature.component';
import { RtuDocumentScannerWithFinderFeature } from '../scanbotsdk-features/rtu-document-scanner-with-finder/rtu-document-scanner-with-finder-feature.component';
import { RtuDocumentScannerFeature } from '../scanbotsdk-features/rtu-document-scanner/rtu-document-scanner-feature.component';
import { RtuFindAndPickBarcodeScanningFeatureComponent } from '../scanbotsdk-features/rtu-find-and-pick-barcode-scanning/rtu-find-and-pick-barcode-scanning-feature.component';
import { RtuGenericDocumentRecognizerFeature } from '../scanbotsdk-features/rtu-generic-document-recognizer/rtu-generic-document-recognizer-feature.component';
import { RtuHealthInsuranceCardScannerFeature } from '../scanbotsdk-features/rtu-health-insurance-card-scanner/rtu-health-insurance-card-scanner-feature.component';
import { RtuLicensePlateScannerFeature } from '../scanbotsdk-features/rtu-license-plate-scanner/rtu-license-plate-scanner-feature.component';
import { RtuMedicalCertificateScannerFeature } from '../scanbotsdk-features/rtu-medical-certificate-scanner/rtu-medical-certificate-scanner-feature.component';
import { RtuMrzScannerFeature } from '../scanbotsdk-features/rtu-mrz-scanner/rtu-mrz-scanner-feature.component';
import { RtuMultiArBarcodeScanningFeatureComponent } from '../scanbotsdk-features/rtu-multi-ar-barcode-scanning/rtu-multi-ar-barcode-scanning-feature.component';
import { RtuMultiBarcodeScanningFeatureComponent } from '../scanbotsdk-features/rtu-multi-barcode-scanning/rtu-multi-barcode-scanning-feature.component';
import { RtuSingleBarcodeScanningFeatureComponent } from '../scanbotsdk-features/rtu-single-barcode-scanning/rtu-single-barcode-scanning-feature.component';
import { RtuTextDataScannerFeature } from '../scanbotsdk-features/rtu-text-data-scanner/rtu-text-data-scanner-feature.component';
import { RtuVinScannerComponent } from '../scanbotsdk-features/rtu-vin-scanner/rtu-vin-scanner.component';

import { ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';
import { RtuSinglePageScanningComponent } from '../scanbotsdk-features/rtu-single-page-scanning/rtu-single-page-scanning.component';
import { RtuSinglePageScanningComponentWithFinder } from '../scanbotsdk-features/rtu-single-page-scanning-with-finder/rtu-single-page-scanning-with-finder.component';
import { RtuMultiPageScanningComponent } from "../scanbotsdk-features/rtu-multi-page-scanning/rtu-multi-page-scanning.component";
import {
    RtuPickDocumentFromGalleryComponent
} from "../scanbotsdk-features/rtu-pick-document-from-gallery/rtu-pick-document-from-gallery.component";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        CommonModule,
        RouterLink,
        RtuDocumentScannerFeature,
        RtuDocumentScannerWithFinderFeature,
        DetectDocumentOnPageFeature,
        DetectDocumentOnImageFeature,
        ExtractPagesFromPdfFeature,
        ExtractImagesFromPdfFeature,
        RtuSingleBarcodeScanningFeatureComponent,
        RtuMultiBarcodeScanningFeatureComponent,
        RtuMultiArBarcodeScanningFeatureComponent,
        RtuFindAndPickBarcodeScanningFeatureComponent,
        LegacyRtuBarcodeScannerFeature,
        LegacyRtuBatchBarcodeScannerFeature,
        DetectBarcodesOnImageFeature,
        RtuMrzScannerFeature,
        RtuMedicalCertificateScannerFeature,
        RtuGenericDocumentRecognizerFeature,
        RtuCheckRecognizerFeature,
        RtuHealthInsuranceCardScannerFeature,
        RtuLicensePlateScannerFeature,
        RtuTextDataScannerFeature,
        RecognizeCheckOnImageFeature,
        RecognizeMrzOnImageFeature,
        RecognizeMedicalCertificateOnImageFeature,
        RecognizeEhicOnImageFeature,
        RecognizeGenericDocumentOnImageFeature,
        ApplyFilterOnImageFeature,
        AnalyzeDocumentQualityFeature,
        PerformOcrOnImageFeature,
        RtuVinScannerComponent,
        RtuSinglePageScanningComponent,
        RtuSinglePageScanningComponentWithFinder,
        RtuMultiPageScanningComponent,
        RtuPickDocumentFromGalleryComponent
    ],
})
export class HomePage {
    private scanbotUtils = inject(ScanbotUtils);
    private utils = inject(CommonUtils);
    private router = inject(Router);

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

    async showBarcodeFormatsScreen() {
        if (await this.isLicenseValid()) {
            this.router.navigate(['/barcode-formats']);
        }
    }

    async showBarcodeDocumentFormatsScreen() {
        if (await this.isLicenseValid()) {
            this.router.navigate(['/barcode-document-formats']);
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
            this.utils.showWarningAlert(
                this.scanbotUtils.getMessageFromLicenseStatus(
                    licenseInfo.licenseStatus
                )
            );
            return false;
        }
    }
}
