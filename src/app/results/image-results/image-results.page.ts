import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { PreferencesUtils } from 'src/app/utils/preferences-utils';
import { Page } from 'capacitor-plugin-scanbot-sdk';
import { Capacitor } from '@capacitor/core';
import { ScanbotService } from 'src/app/services/scanbot.service';
import { CommonUtils } from 'src/app/utils/common-utils';
import { RouterLink } from '@angular/router';
import { FileUtils } from 'src/app/utils/file-utils';

interface ImageResult {
    page: Page;
    pagePreviewWebViewPath: string;
}

@Component({
    selector: 'app-image-results',
    templateUrl: './image-results.page.html',
    styleUrls: ['./image-results.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class ImageResultsPage {
    private preferencesUtils = inject(PreferencesUtils);
    private scanbot = inject(ScanbotService);
    private utils = inject(CommonUtils);
    private fileUtils = inject(FileUtils);
    private actionSheetCtrl = inject(ActionSheetController);

    imageResults: ImageResult[] = [];

    constructor() { }

    ionViewWillEnter() {
        this.loadImageResults();
    }

    private async loadImageResults() {
        this.imageResults = [];

        (await this.preferencesUtils.getAllPagesFromPrefs()).forEach((p) => {
            if (p.documentPreviewImageFileUri) {
                this.imageResults.unshift({
                    page: p,
                    pagePreviewWebViewPath: Capacitor.convertFileSrc(
                        p.documentPreviewImageFileUri,
                    ),
                });
            }
        });
    }

    private getImageResultsUris(): string[] {
        return this.imageResults.map(
            (img) =>
                img.page.documentImageFileUri || img.page.originalImageFileUri,
        );
    }

    private isResultsListEmpty(warningMessage: string): boolean {
        if (this.imageResults.length == 0) {
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
        if (!(await this.scanbot.isLicenseValid())) {
            return;
        }

        try {
            const documentResult = await this.scanbot.scanDocument();

            if (documentResult.status === 'OK') {
                await this.preferencesUtils.savePages(documentResult.pages);
                this.loadImageResults();
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }

    async showDeleteAllResultsConfirmationDialog() {
        if (
            this.isResultsListEmpty(
                'No images to delete. Please scan one or more documents first.',
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
        await this.scanbot.cleanup();
        this.imageResults = [];
    }

    async saveResultsAs() {
        if (
            this.isResultsListEmpty(
                'No images to save. Please scan one or more documents first.',
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
        if (!(await this.scanbot.isLicenseValid())) {
            return;
        }

        try {
            await this.utils.showLoader();
            const saveResult = await this.scanbot.saveImagesAsPDF(
                this.getImageResultsUris(),
            );

            await this.utils.dismissLoader();
            await this.fileUtils.openPdfFile(saveResult.pdfFileUri);
        } catch (e: any) {
            await this.utils.dismissLoader();
            this.utils.showErrorAlert(e.message);
        }
    }

    private async saveResultsAsPDFWithOCR() {
        if (!(await this.scanbot.isLicenseValid())) {
            return;
        }

        try {
            await this.utils.showLoader();
            const saveResult = await this.scanbot.saveImagesAsPDFWithOCR(
                this.getImageResultsUris(),
            );

            await this.utils.dismissLoader();
            await this.fileUtils.openPdfFile(saveResult.pdfFileUri);
        } catch (e: any) {
            await this.utils.dismissLoader();
            this.utils.showErrorAlert(e.message);
        }
    }

    private async saveResultsAsTIFF(binarized: boolean) {
        if (!(await this.scanbot.isLicenseValid())) {
            return;
        }

        if (this.scanbot.FILE_ENCRYPTION_ENABLED) {
            this.utils.showWarningAlert(
                'Encryption for TIFF files currently not supported. ' +
                'In order to test TIFF please disable image file encryption',
            );

            return;
        }

        try {
            await this.utils.showLoader();
            const saveResult = await this.scanbot.saveResultsAsTIFF(
                this.getImageResultsUris(),
                binarized,
            );

            await this.utils.dismissLoader();
            await this.fileUtils.openTiffFile(saveResult.tiffFileUri);
        } catch (e: any) {
            await this.utils.dismissLoader();
            this.utils.showErrorAlert(e.message);
        }
    }
}
