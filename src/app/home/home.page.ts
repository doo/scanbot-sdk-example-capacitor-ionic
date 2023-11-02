import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';

import { CommonUtils } from '../utils/common-utils';

import {
    Feature,
    FeatureId,
    ScanbotService,
} from '../services/scanbot.service';
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
    ],
    })
export class HomePage implements OnInit {
    private scanbot = inject(ScanbotService);
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

    constructor() {}

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
            if (await this.scanbot.isLicenseValid()) {
                this.utils.showOCRConfigs(await this.scanbot.getOCRConfigs());
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }

    async showBarcodeFormatsScreen() {
        if (await this.scanbot.isLicenseValid()) {
            this.router.navigate(['/barcode-formats']);
        }
    }

    async showBarcodeDocumentFormatsScreen() {
        if (await this.scanbot.isLicenseValid()) {
            this.router.navigate(['/barcode-document-formats']);
        }
    }
}
