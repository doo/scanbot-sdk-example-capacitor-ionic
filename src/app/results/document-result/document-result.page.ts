import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import {
    DocumentData,
    OCRConfiguration,
    PageData,
    ScanbotBinarizationFilter,
    ScanbotSDK
} from "capacitor-plugin-scanbot-sdk";
import { CommonUtils } from "../../utils/common-utils";
import { FileUtils } from "../../utils/file-utils";
import { ActionSheetController, IonicModule, NavController } from "@ionic/angular";
import { ImageUtils } from "../../utils/image-utils";
import { DocumentScanningFlow, startDocumentScanner } from "capacitor-plugin-scanbot-sdk/ui_v2";
import { Capacitor } from "@capacitor/core";

interface PageDataResult {
    page: PageData;
    pagePreviewWebViewPath: string;
}

@Component({
    selector: 'app-document-result',
    templateUrl: './document-result.page.html',
    styleUrls: ['./document-result.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, RouterLink,]
})
export class DocumentResultPage implements OnInit {

    document!: DocumentData
    pageImagePreviews: PageDataResult[] = []

    private navController = inject(NavController);
    private utils = inject(CommonUtils);
    private fileUtils = inject(FileUtils);
    private actionSheetCtrl = inject(ActionSheetController);
    private imageUtils = inject(ImageUtils);
    private activatedRoute = inject(ActivatedRoute);

    constructor() {
    }

    async ngOnInit() {
        this.activatedRoute.paramMap.subscribe(async (params) => {
            const documentID = params.get('documentID') as string;
            await this.loadDocument(documentID);
        });
    }

    private updateCurrentDocument(updatedDocument: DocumentData) {

        this.document = updatedDocument;

        this.pageImagePreviews = this.document.pages.map(page => ({
            page: page,
            pagePreviewWebViewPath: Capacitor.convertFileSrc(
                (page.documentImagePreviewURI || page.originalImageURI) + '?' + Date.now()
            )
        } as PageDataResult)
        )
    }

    async onPageSelect(page: PageData) {
        await this.navController.navigateForward(['/page-result', this.document.uuid, page.uuid]);
    }

    private async loadDocument(id: string) {
        try {
            // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
            if (!(await this.isLicenseValid())) {
                return;
            }

            /** Load the document from disc */
            const documentResult = await ScanbotSDK.Document.loadDocument({
                documentID: id
            })

            this.updateCurrentDocument(documentResult)
        } catch (e: any) {
            await this.utils.showErrorAlert(e.message);
        }
    }

    async onContinueScanning() {
        try {
            // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
            if (!(await this.isLicenseValid())) {
                return;
            }
            /**
             * Create the document configuration object and
             * start the document scanner with the configuration and documentUUID
             */
            const configuration = new DocumentScanningFlow();
            configuration.documentUuid = this.document.uuid
            configuration.cleanScanningSession = false;

            await startDocumentScanner(configuration);

            this.loadDocument(this.document.uuid);
        } catch (e: any) {
            await this.utils.showErrorAlert(e.message);
        }
    }

    async onAddPage() {
        try {
            // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
            if (!(await this.isLicenseValid())) {
                return;
            }

            // Select image from the library
            const imageFileUri = await this.imageUtils.selectImageFromLibrary();
            if (!imageFileUri) {
                return;
            }

            await this.utils.showLoader();

            /** Add a page to the document */
            const documentResult = await ScanbotSDK.Document.addPage({
                documentID: this.document.uuid,
                imageFileUri,
                documentDetection: true,
            });
            /**
             * Handle the result
             */
            this.updateCurrentDocument(documentResult)
        } catch (e: any) {
            await this.utils.showErrorAlert(e.message);
        } finally {
            await this.utils.dismissLoader();
        }
    }

    async onExport() {
        const actionSheet = await this.actionSheetCtrl.create({
            header: 'Save results as',
            buttons: [
                {
                    text: 'PDF',
                    handler: () => {
                        this.onSavePDF(false);
                    },
                },
                {
                    text: 'PDF with OCR (Sandwiched PDF)',
                    handler: () => {
                        this.onSavePDF(true);
                    },
                },
                {
                    text: 'TIFF (1-bit B&W)',
                    handler: () => {
                        this.onSaveTiff(true);
                    },
                },
                {
                    text: 'TIFF (color)',
                    handler: () => {
                        this.onSaveTiff(false);
                    },
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                },
            ],
        });
        await actionSheet.present();
    }

    private async isLicenseValid() {
        const licenseInfo = await ScanbotSDK.getLicenseInfo();

        if (licenseInfo.isLicenseValid
        ) {
            // We have a valid (trial) license and can call other Scanbot SDK methods.
            // E.g. launch the Document Scanner
            return true;
        } else {
            // The license is not valid. We will return false and show the status
            this.utils.showWarningAlert(licenseInfo.licenseStatusMessage ?? "Invalid License");
            return false;
        }
    }

    async onSavePDF(sandwichedPDF: boolean = false) {
        try {
            // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
            if (!(await this.isLicenseValid())) {
                return;
            }
            await this.utils.showLoader();
            /**
             * Create a PDF with the provided option
             */
            const ocrConfiguration: OCRConfiguration | undefined = sandwichedPDF
                ? {
                    engineMode: 'SCANBOT_OCR',
                }
                : undefined;

            const result = await ScanbotSDK.Document.createPDF({
                documentID: this.document.uuid,
                options: {
                    pageSize: 'A4',
                    pageDirection: 'PORTRAIT',
                    ocrConfiguration: ocrConfiguration,
                },
            });
            /**
             * Handle the result by displaying an action sheet
             */
            await this.fileUtils.openPdfFile(result.pdfFileUri);
        } catch (e: any) {
            await this.utils.showErrorAlert(e.message);
        } finally {
            await this.utils.dismissLoader();
        }
    }

    async onSaveTiff(binarized: boolean) {
        try {
            // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
            if (!(await this.isLicenseValid())) {
                return;
            }
            await this.utils.showLoader();
            /**
             * Create a tiff file from the document
             */
            const result = await ScanbotSDK.Document.createTIFF({
                documentID: this.document.uuid,
                options: {
                    binarizationFilter: binarized
                        ? new ScanbotBinarizationFilter()
                        : undefined,
                    dpi: 300,
                    compression: binarized ? 'CCITT_T6' : 'ADOBE_DEFLATE', // optional compression
                },
            });
            /**
             * Handle the result by displaying an action sheet
             */
            await this.fileUtils.openPdfFile(result.tiffFileUri);
        } catch (e: any) {
            await this.utils.showErrorAlert(e.message);
        } finally {
            await this.utils.dismissLoader();
        }
    }

}
