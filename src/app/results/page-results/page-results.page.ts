import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { RouterLink } from '@angular/router';

import { PreferencesUtils } from 'src/app/utils/preferences-utils';
import { CommonUtils } from 'src/app/utils/common-utils';
import { FileUtils } from 'src/app/utils/file-utils';
import { Colors } from 'src/theme/theme';
import { ScanbotUtils } from 'src/app/utils/scanbot-utils';

import { DocumentScannerConfiguration, Page, ScanbotBinarizationFilter, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

interface PageResult {
    page: Page;
    pagePreviewWebViewPath: string;
}

@Component({
    selector: 'app-page-results',
    templateUrl: './page-results.page.html',
    styleUrls: ['./page-results.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class PageResultsPage {
    private preferencesUtils = inject(PreferencesUtils);
    private scanbotUtils = inject(ScanbotUtils);
    private utils = inject(CommonUtils);
    private fileUtils = inject(FileUtils);
    private actionSheetCtrl = inject(ActionSheetController);

    pageResults: PageResult[] = [];

    constructor() { }

    ionViewWillEnter() {
        this.loadPageResults();
    }

    private async loadPageResults() {
        this.pageResults = [];

        (await this.preferencesUtils.getAllPagesFromPrefs()).forEach((p) => {
            if (p.documentPreviewImageFileUri) {
                this.pageResults.unshift({
                    page: p,
                    pagePreviewWebViewPath: Capacitor.convertFileSrc(
                        p.documentPreviewImageFileUri,
                    ),
                });
            }
        });
    }

    private getImageResultsUris(): string[] {
        return this.pageResults.map(
            (result) =>
                result.page.documentImageFileUri || result.page.originalImageFileUri,
        );
    }

    private isResultsListEmpty(warningMessage: string): boolean {
        if (this.pageResults.length == 0) {
            this.utils.showWarningAlert(warningMessage);
            return true;
        } else {
            return false;
        }
    }

    getBackButtonText() {
        return this.utils.isiOSPlatform() ? 'Home' : '';
    }

    async scanDocument() {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        const configuration: DocumentScannerConfiguration = {
            // Customize colors, text resources, behavior, etc..
            polygonColor: '#00ffff',
            bottomBarBackgroundColor: Colors.scanbotRed,
            topBarBackgroundColor: Colors.scanbotRed,
            cameraBackgroundColor: Colors.scanbotRed,
            orientationLockMode: 'PORTRAIT',
            pageCounterButtonTitle: '%d Page(s)',
            multiPageEnabled: false,
            ignoreBadAspectRatio: true,
            // see further configs ...
        };

        try {
            const documentResult = await ScanbotSDK.startDocumentScanner(configuration);

            if (documentResult.status === 'OK' && documentResult.pages.length > 0) {
                // Handle the scanned pages from result
                await this.preferencesUtils.savePages(documentResult.pages);
                this.loadPageResults();
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }

    async showDeleteAllResultsConfirmationDialog() {
        if (
            this.isResultsListEmpty(
                'No pages to delete. Please scan one or more documents first.',
            )
        ) {
            return;
        }

        await this.utils.showAlert({
            header: 'Delete all results ?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                },
                {
                    text: 'Delete',
                    role: 'destructive',
                    handler: () => {
                        this.deleteAllResults();
                    },
                },
            ],
        });
    }

    private async deleteAllResults() {
        await this.preferencesUtils.deleteAllPages();
        await ScanbotSDK.cleanup();
        this.pageResults = [];
    }

    async saveResultsAs() {
        if (
            this.isResultsListEmpty(
                'No pages to save. Please scan one or more documents first.',
            )
        ) {
            return;
        }

        const actionSheet = await this.actionSheetCtrl.create({
            header: 'Save results as',
            buttons: [
                {
                    text: 'PDF',
                    handler: () => {
                        this.saveResultsAsPDF();
                    },
                },
                {
                    text: 'PDF with OCR',
                    handler: () => {
                        this.saveResultsAsPDFWithOCR();
                    },
                },
                {
                    text: 'TIFF (1-bit B&W)',
                    handler: () => {
                        this.saveResultsAsTIFF(true);
                    },
                },
                {
                    text: 'TIFF (color)',
                    handler: () => {
                        this.saveResultsAsTIFF(false);
                    },
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                },
            ],
        });
        actionSheet.present();
    }

    private async saveResultsAsPDF() {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        try {
            await this.utils.showLoader();

            const saveResult = await ScanbotSDK.createPDF({
                imageFileUris: this.getImageResultsUris(),
                options: {
                    pageSize: 'A4',
                }
            });

            await this.utils.dismissLoader();
            // use the PDF file URI from result, e.g.:
            await this.fileUtils.openPdfFile(saveResult.pdfFileUri);
        } catch (e: any) {
            await this.utils.dismissLoader();
            this.utils.showErrorAlert(e.message);
        }
    }

    private async saveResultsAsPDFWithOCR() {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        try {
            await this.utils.showLoader();

            const pdf = await ScanbotSDK.createPDF({
                imageFileUris: this.getImageResultsUris(),
                options: {
                    pageSize: 'A4',
                    ocrConfiguration: {
                        engineMode: 'SCANBOT_OCR'
                    }
                }
            });

            await this.utils.dismissLoader();
            // use the PDF file URI from result, e.g.:
            await this.fileUtils.openPdfFile(pdf.pdfFileUri);
        } catch (e: any) {
            await this.utils.dismissLoader();
            this.utils.showErrorAlert(e.message);
        }
    }

    private async saveResultsAsTIFF(binarized: boolean) {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        try {
            await this.utils.showLoader();

            const result = await ScanbotSDK.writeTIFF({
                imageFileUris: this.getImageResultsUris(),
                options: {
                    binarizationFilter: binarized ? new ScanbotBinarizationFilter() : undefined,
                    dpi: 300,
                    compression: binarized ? 'CCITT_T6' : 'ADOBE_DEFLATE', // optional compression. see documentation!
                },
            });

            await this.utils.dismissLoader();
            // use the TIFF file URI from result, e.g.:
            await this.fileUtils.openTiffFile(result.tiffFileUri);
        } catch (e: any) {
            await this.utils.dismissLoader();
            this.utils.showErrorAlert(e.message);
        }
    }

    async isLicenseValid(): Promise<boolean> {
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
