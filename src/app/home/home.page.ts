import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';

import { Feature, FeatureId, ScanbotUtils } from '../utils/scanbot-utils';
import { CommonUtils } from '../utils/common-utils';

import { RtuDocumentScannerFeature } from '../scanbotsdk-features/rtu-document-scanner/rtu-document-scanner-feature.component';
import { RtuDocumentScannerWithFinderFeature } from '../scanbotsdk-features/rtu-document-scanner-with-finder/rtu-document-scanner-with-finder-feature.component';
import { DetectDocumentOnPageFeature } from '../scanbotsdk-features/detect-document-on-page/detect-document-on-page-feature.component';
import { DetectDocumentOnImageFeature } from '../scanbotsdk-features/detect-document-on-image/detect-document-on-image-feature.component';
import { ExtractPagesFromPdfFeature } from '../scanbotsdk-features/extract-pages-from-pdf/extract-pages-from-pdf-feature.component';
import { ExtractImagesFromPdfFeature } from '../scanbotsdk-features/extract-images-from-pdf/extract-images-from-pdf-feature.component';
import { RtuBarcodeScannerFeature } from '../scanbotsdk-features/rtu-barcode-scanner/rtu-barcode-scanner-feature.component';
import { RtuBatchBarcodeScannerFeature } from '../scanbotsdk-features/rtu-batch-barcode-scanner/rtu-batch-barcode-scanner-feature.component';
import { DetectBarcodesOnImageFeature } from '../scanbotsdk-features/detect-barcodes-on-image/detect-barcodes-on-image-feature.component';
import { DetectBarcodesOnMultipleImagesFeature } from '../scanbotsdk-features/detect-barcodes-on-multiple-images/detect-barcodes-on-multiple-images-feature.component';
import { RtuMrzScannerFeature } from '../scanbotsdk-features/rtu-mrz-scanner/rtu-mrz-scanner-feature.component';
import { RtuMedicalCertificateScannerFeature } from '../scanbotsdk-features/rtu-medical-certificate-scanner/rtu-medical-certificate-scanner-feature.component';
import { RtuGenericDocumentRecognizerFeature } from '../scanbotsdk-features/rtu-generic-document-recognizer/rtu-generic-document-recognizer-feature.component';
import { RtuCheckRecognizerFeature } from '../scanbotsdk-features/rtu-check-recognizer/rtu-check-recognizer-feature.component';
import { RtuHealthInsuranceCardScannerFeature } from '../scanbotsdk-features/rtu-health-insurance-card-scanner/rtu-health-insurance-card-scanner-feature.component';
import { RtuLicensePlateScannerFeature } from '../scanbotsdk-features/rtu-license-plate-scanner/rtu-license-plate-scanner-feature.component';
import { RtuTextDataScannerFeature } from '../scanbotsdk-features/rtu-text-data-scanner/rtu-text-data-scanner-feature.component';
import { RecognizeCheckOnImageFeature } from '../scanbotsdk-features/recognize-check-on-image/recognize-check-on-image-feature.component';
import { ApplyFilterOnImageFeature } from '../scanbotsdk-features/apply-filter-on-image/apply-filter-on-image-feature.component';
import { RtuVinScannerComponent } from "../scanbotsdk-features/rtu-vin-scanner/rtu-vin-scanner.component";

import { ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

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
        RtuBarcodeScannerFeature,
        RtuBatchBarcodeScannerFeature,
        DetectBarcodesOnImageFeature,
        DetectBarcodesOnMultipleImagesFeature,
        RtuMrzScannerFeature,
        RtuMedicalCertificateScannerFeature,
        RtuGenericDocumentRecognizerFeature,
        RtuCheckRecognizerFeature,
        RtuHealthInsuranceCardScannerFeature,
        RtuLicensePlateScannerFeature,
        RtuTextDataScannerFeature,
        RecognizeCheckOnImageFeature,
        ApplyFilterOnImageFeature,
        RtuVinScannerComponent,
    ],
})
export class HomePage {
    private scanbotUtils = inject(ScanbotUtils);
    private utils = inject(CommonUtils);
    private router = inject(Router);

    readonly featureScanLicensePlateMLBased: Feature = {
        id: FeatureId.LicensePlateScannerML,
        title: 'Scan Vehicle License Plate (ML Based)',
    };
    readonly featureScanLicensePlateClassic: Feature = {
        id: FeatureId.LicensePlateScannerClassic,
        title: 'Scan Vehicle License Plate (Classic)',
    };

    readonly currentYear = new Date().getFullYear();

    constructor() { }

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
                this.scanbotUtils.getMessageFromLicenseStatus(licenseInfo.licenseStatus),
            );
            return false;
        }
    }
}
