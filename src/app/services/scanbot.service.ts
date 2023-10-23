import { Injectable, inject } from '@angular/core';
import { CommonUtils } from '../utils/common-utils';
import { ImageUtils } from '../utils/image-utils';
import { FileUtils } from '../utils/file-utils';
import { ActionSheetController } from '@ionic/angular';
import { Colors } from 'src/theme/theme';

import {
  ScanbotSDK,
  DocumentScannerResult,
  BarcodeResult,
  LicenseStatus,
  BarcodeDocumentFormat,
  BarcodeFormat,
  Page,
  DetectDocumentResult,
  EstimateBlurResult,
  ExtractPagesFromPdfResult,
  ExtractImagesFromPdfResult,
  DetectBarcodesOnImageResult,
  DetectBarcodesOnImagesResult,
  MrzResult,
  MrzScannerConfiguration,
  MedicalCertificateScannerResult,
  CheckRecognizerResult,
  HealthInsuranceCardScannerResult,
  LicensePlateScanStrategy,
  LicensePlateScannerResult,
  TextDataScannerResult,
  RecognizeCheckResult,
  ImageFilterType,
  ApplyImageFilterResult,
  GetLicenseInfoResult,
  GetOCRConfigsResult,
  CameraImageFormat,
  CreatePDFResult,
  PerformOCRResult,
  WriteTIFFResult,
  BaseSdkResult,
  RemovePageResult,
  CroppingResult,
  GenericDocumentRecognizerResult
} from 'capacitor-plugin-scanbot-sdk';
import { Preferences } from '@capacitor/preferences';

export interface Feature {
  id: FeatureId,
  title: string
}

export enum FeatureId {
  DocumentScanner,
  DetectDocumentFromPage,
  DetectDocumentFromImage,
  ExtractPagesFromPdf,
  ExtractImagesFromPdf,
  ScanBarcodes,
  ScanBatchBarcodes,
  DetectBarcodesOnStillImage,
  DetectBarcodesOnStillImages,
  ScanMRZ,
  ScanMedicalCertificate,
  ScanGenericDocument,
  ScanEHIC,
  LicenseInfo,
  OcrConfigs,
  LicensePlateScannerML,
  LicensePlateScannerClassic,
  TextDataScanner,
  CheckRecognizer,
  BarcodeCameraViewComponent,
  RecognizeCheckOnImage,
  ApplyFilterOnImage,
  FinderDocumentScanner
}

export interface BarcodeSetting {
  format: BarcodeFormat,
  accepted: boolean,
}

export const BARCODE_DOCUMENT_FORMATS_ENABLED_KEY = 'barcodeDocumentFormatsEnabled'
export interface BarcodeDocumentSetting {
  format: BarcodeDocumentFormat,
  accepted: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class ScanbotService {

  private utils = inject(CommonUtils);
  private imageUtils = inject(ImageUtils);
  private fileUtils = inject(FileUtils);
  private actionSheetCtrl = inject(ActionSheetController);

  // set your key here
  private licenseKey = "";

  //todo configure this
  // !! Please read note !!
  // It is strongly recommended to use the default (secure) storage location of the Scanbot SDK.
  // However, for demo purposes we overwrite the "storageBaseDirectory" of the Scanbot SDK by a custom storage directory.
  //
  // On Android we use the "ExternalDirectoryPath" which is a public(!) folder.
  // All image files and export files (PDF, TIFF, etc.) created by the Scanbot SDK in this demo app will be stored
  // in this public storage directory and will be accessible for every(!) app having external storage permissions!
  // Again, this is only for demo purposes, which allows us to easily fetch and check the generated files
  // via Android "adb" CLI tools, Android File Transfer app, Android Studio, etc.
  //
  // On iOS, we use the "DocumentDirectoryPath" which is accessible via iTunes file sharing.
  //
  // For more details about the storage system of the Scanbot SDK Capacitor Module please see our docs:
  // - https://docs.scanbot.io/document-scanner-sdk/capacitor/introduction/
  //
  // For more details about the file system on Android and iOS we also recommend to check out:
  // - https://developer.android.com/guide/topics/data/data-storage
  // - https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html
  private storageBaseDirectory = '';

  readonly SCANBOT_IMAGES_FILE_FORMAT: CameraImageFormat = 'JPG'
  readonly FILE_ENCRYPTION_ENABLED: boolean = false

  constructor() { }

  async initializeSDK() {
    try {
      const result = await ScanbotSDK.initializeSDK({
        licenseKey: this.licenseKey,
        loggingEnabled: true,
        storageImageFormat: this.SCANBOT_IMAGES_FILE_FORMAT, // Format of stored images
        storageImageQuality: 80, // Quality of stored images
        storageBaseDirectory: this.storageBaseDirectory, // Custom storage path
        documentDetectorMode: 'ML_BASED', // The engine used to detect documents,
        fileEncryptionMode: this.FILE_ENCRYPTION_ENABLED ? 'AES256' : undefined,
        fileEncryptionPassword: this.FILE_ENCRYPTION_ENABLED ? 'SomeSecretPa$$w0rdForFileEncryptio' : undefined
      });
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  }

  async getBarcodeSettings(): Promise<BarcodeSetting[]> {
    return [
      { format: 'AZTEC', accepted: await this.isBarcodeFormatAccepted('AZTEC') },
      { format: 'CODABAR', accepted: await this.isBarcodeFormatAccepted('CODABAR') },
      { format: 'CODE_25', accepted: await this.isBarcodeFormatAccepted('CODE_25') },
      { format: 'CODE_39', accepted: await this.isBarcodeFormatAccepted('CODE_39') },
      { format: 'CODE_93', accepted: await this.isBarcodeFormatAccepted('CODE_93') },
      { format: 'CODE_128', accepted: await this.isBarcodeFormatAccepted('CODE_128') },
      { format: 'DATA_MATRIX', accepted: await this.isBarcodeFormatAccepted('DATA_MATRIX') },
      { format: 'EAN_8', accepted: await this.isBarcodeFormatAccepted('EAN_8') },
      { format: 'EAN_13', accepted: await this.isBarcodeFormatAccepted('EAN_13') },
      { format: 'ITF', accepted: await this.isBarcodeFormatAccepted('ITF') },
      { format: 'PDF_417', accepted: await this.isBarcodeFormatAccepted('PDF_417') },
      { format: 'QR_CODE', accepted: await this.isBarcodeFormatAccepted('QR_CODE') },
      { format: 'RSS_14', accepted: await this.isBarcodeFormatAccepted('RSS_14') },
      { format: 'RSS_EXPANDED', accepted: await this.isBarcodeFormatAccepted('RSS_EXPANDED') },
      { format: 'UPC_A', accepted: await this.isBarcodeFormatAccepted('UPC_A') },
      { format: 'UPC_E', accepted: await this.isBarcodeFormatAccepted('UPC_E') },
      { format: 'UNKNOWN', accepted: await this.isBarcodeFormatAccepted('UNKNOWN') },
      { format: 'MSI_PLESSEY', accepted: await this.isBarcodeFormatAccepted('MSI_PLESSEY') },
      { format: 'IATA_2_OF_5', accepted: await this.isBarcodeFormatAccepted('IATA_2_OF_5') },
      { format: 'INDUSTRIAL_2_OF_5', accepted: await this.isBarcodeFormatAccepted('INDUSTRIAL_2_OF_5') }
    ];
  }

  async getBarcodeDocumentSettings(): Promise<BarcodeDocumentSetting[]> {
    return [
      { format: 'AAMVA', accepted: await this.isBarcodeDocumentFormatAccepted('AAMVA') },
      { format: 'BOARDING_PASS', accepted: await this.isBarcodeDocumentFormatAccepted('BOARDING_PASS') },
      { format: 'DE_MEDICAL_PLAN', accepted: await this.isBarcodeDocumentFormatAccepted('DE_MEDICAL_PLAN') },
      { format: 'MEDICAL_CERTIFICATE', accepted: await this.isBarcodeDocumentFormatAccepted('MEDICAL_CERTIFICATE') },
      { format: 'ID_CARD_PDF_417', accepted: await this.isBarcodeDocumentFormatAccepted('ID_CARD_PDF_417') },
      { format: 'SEPA', accepted: await this.isBarcodeDocumentFormatAccepted('SEPA') },
      { format: 'SWISS_QR', accepted: await this.isBarcodeDocumentFormatAccepted('SWISS_QR') },
      { format: 'VCARD', accepted: await this.isBarcodeDocumentFormatAccepted('VCARD') },
      { format: 'GS1', accepted: await this.isBarcodeDocumentFormatAccepted('GS1') }
    ];
  }

  scanDocument(): Promise<DocumentScannerResult> {
    return ScanbotSDK.startDocumentScanner({
      polygonColor: '#00ffff',
      bottomBarBackgroundColor: Colors.scanbotRed,
      topBarBackgroundColor: Colors.scanbotRed,
      cameraBackgroundColor: Colors.scanbotRed,
      orientationLockMode: 'PORTRAIT',
      pageCounterButtonTitle: '%d Page(s)',
      multiPageEnabled: false,
      ignoreBadAspectRatio: true
    });
  }

  scanDocumentWithFinder(): Promise<DocumentScannerResult> {
    return ScanbotSDK.startFinderDocumentScanner({
      topBarBackgroundColor: Colors.scanbotRed,
      cameraBackgroundColor: Colors.scanbotRed,
      orientationLockMode: 'PORTRAIT',
      ignoreBadAspectRatio: true,
      finderLineColor: Colors.scanbotRed
    });
  }

  async detectDocumentFromPage(imageUri?: string | undefined): Promise<Page> {
    let imageFileUri = imageUri;

    if (!imageFileUri)
      imageFileUri = (await this.imageUtils.selectImagesFromLibrary())[0];

    /**
       * Create a page from the selected image
       */
    let page = await ScanbotSDK.createPage({ imageUri: imageFileUri });
    /**
       * Detect the document on the page
       */
    return ScanbotSDK.detectDocumentOnPage({ page: page });
  }

  async detectDocumentFromImage(imageUri?: string | undefined): Promise<DetectDocumentResult> {
    let imageFileUri = imageUri;

    if (!imageFileUri)
      imageFileUri = (await this.imageUtils.selectImagesFromLibrary())[0];

    return ScanbotSDK.detectDocument({ imageFileUri: imageFileUri });
  }

  async estimateBlur(imageUri?: string | undefined): Promise<EstimateBlurResult> {
    let imageFileUri = imageUri;

    if (!imageFileUri)
      imageFileUri = (await this.imageUtils.selectImagesFromLibrary())[0];

    return ScanbotSDK.estimateBlur({ imageFileUri: imageFileUri });
  }

  async extractPagesFromPdf(): Promise<ExtractPagesFromPdfResult> {
    const pdfFilePath = await this.fileUtils.selectPdfFile();

    return ScanbotSDK.extractPagesFromPdf({
      pdfFilePath: pdfFilePath,
    });
  }

  async extractImagesFromPdf(): Promise<ExtractImagesFromPdfResult> {
    const pdfFilePath = await this.fileUtils.selectPdfFile();

    return ScanbotSDK.extractImagesFromPdf({
      pdfFilePath: pdfFilePath,
    });
  }

  async scanBarcode(): Promise<BarcodeResult> {
    return ScanbotSDK.startBarcodeScanner({
      acceptedDocumentFormats: await this.isBarcodeDocumentFormatsEnabled() ? await this.getAcceptedBarcodeDocumentFormats() : [],
      barcodeFormats: await this.getAcceptedBarcodeFormats(),
      finderAspectRatio: { width: 1, height: 1 },
      useButtonsAllCaps: false,
      barcodeImageGenerationType: 'NONE',
    });
  }

  async scanBatchBarcodes(): Promise<BarcodeResult> {
    return ScanbotSDK.startBatchBarcodeScanner({
      acceptedDocumentFormats: await this.isBarcodeDocumentFormatsEnabled() ? await this.getAcceptedBarcodeDocumentFormats() : [],
      barcodeFormats: await this.getAcceptedBarcodeFormats(),
      finderAspectRatio: { width: 1, height: 1 },
      useButtonsAllCaps: false
    });
  }

  async isLicenseValid(): Promise<boolean> {
    const licenseInfo = await ScanbotSDK.getLicenseInfo();

    if (!licenseInfo.isLicenseValid)
      this.utils.showWarningAlert(this.getErrorStringFromLicenseStatus(licenseInfo.licenseStatus));

    return licenseInfo.isLicenseValid;
  }

  async detectBarcodesOnStillImage(imageUri?: string | undefined): Promise<DetectBarcodesOnImageResult> {
    let imageFileUri = imageUri;

    if (!imageFileUri)
      imageFileUri = (await this.imageUtils.selectImagesFromLibrary())[0];

    return ScanbotSDK.detectBarcodesOnImage({
      acceptedDocumentFormats: await this.isBarcodeDocumentFormatsEnabled() ? await this.getAcceptedBarcodeDocumentFormats() : [],
      barcodeFormats: await this.getAcceptedBarcodeFormats(),
      imageFileUri: imageFileUri,
      stripCheckDigits: true,
    });
  }

  async detectBarcodesOnStillImages(imageUris?: string[] | undefined): Promise<DetectBarcodesOnImagesResult> {
    let imageFileUris = imageUris;

    if (!imageFileUris)
      imageFileUris = await this.imageUtils.selectImagesFromLibrary(true);

    return ScanbotSDK.detectBarcodesOnImages({
      acceptedDocumentFormats: await this.isBarcodeDocumentFormatsEnabled() ? await this.getAcceptedBarcodeDocumentFormats() : [],
      barcodeFormats: await this.getAcceptedBarcodeFormats(),
      imageFileUris: imageFileUris,
      stripCheckDigits: true,
    });
  }

  scanMrzId(): Promise<MrzResult> {
    //todo the description ???
    const config: MrzScannerConfiguration = {
      finderTextHint:
        'Please hold your phone over the 2- or 3-line MRZ code at the front of your passport.'
    };

    if (this.utils.isiOSPlatform()) {
      config.finderAspectRatio = {
        width: 0.9,
        height: 0.18,
      };
    }

    return ScanbotSDK.startMrzScanner(config);
  }

  scanMedicalCertificate(): Promise<MedicalCertificateScannerResult> {
    return ScanbotSDK.startMedicalCertificateRecognizer({
      topBarBackgroundColor: Colors.scanbotRed,
      userGuidanceStrings: {
        capturing: 'capturing',
        scanning: 'recognizing',
        processing: 'processing',
        startScanning: 'scanning Started',
        paused: 'paused',
        energySaving: 'energySaving',
      },
      errorDialogMessage: 'error message',
      errorDialogOkButton: 'button text',
      errorDialogTitle: 'error title',
      cancelButtonHidden: false,
      recognizePatientInfo: true,
    });
  }

  scanGenericDocument(): Promise<GenericDocumentRecognizerResult> {
    return ScanbotSDK.startGenericDocumentRecognizer({});
  }

  scanCheck(): Promise<CheckRecognizerResult> {
    return ScanbotSDK.startCheckRecognizer({
      topBarBackgroundColor: Colors.scanbotRed
    });
  }

  scanEHIC(): Promise<HealthInsuranceCardScannerResult> {
    return ScanbotSDK.startEHICScanner({
      finderLineColor: '#ff0000'
    });
  }

  scanLicensePlate(scanStrategy: LicensePlateScanStrategy): Promise<LicensePlateScannerResult> {
    return ScanbotSDK.startLicensePlateScanner({
      topBarBackgroundColor: Colors.scanbotRed,
      scanStrategy: scanStrategy,
    });
  }

  scanTextData(): Promise<TextDataScannerResult> {
    return ScanbotSDK.startTextDataScanner({
      topBarBackgroundColor: Colors.scanbotRed,
      textDataScannerStep: {
        allowedSymbols: '',
        aspectRatio: {
          height: 1.0,
          width: 5.0,
        },
        guidanceText: 'Place the LC display in the frame to scan it',
        pattern: '',
        preferredZoom: 2.0,
        shouldMatchSubstring: false,
        significantShakeDelay: -1,
        textFilterStrategy: 'Document',
        unzoomedFinderHeight: 40,
      }
    });
  }

  async scanCheckFromImage(imageUri?: string | undefined): Promise<RecognizeCheckResult> {
    let imageFileUri = imageUri;

    if (!imageFileUri)
      imageFileUri = (await this.imageUtils.selectImagesFromLibrary())[0];

    return ScanbotSDK.recognizeCheck({
      imageFileUri: imageFileUri
    });
  }

  async chooseFilter(): Promise<ImageFilterType | undefined> {
    let filter: ImageFilterType | undefined;

    //todo style the actionSheet for android
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Choose filter',
      buttons: [
        {
          text: 'None',
          handler: () => {
            filter = 'ImageFilterTypeNone';
          }
        },
        {
          text: 'Color',
          handler: () => {
            filter = 'ImageFilterTypeColor';
          }
        },
        {
          text: 'Gray',
          handler: () => {
            filter = 'ImageFilterTypeGray';
          }
        },
        {
          text: 'Binarized',
          handler: () => {
            filter = 'ImageFilterTypeBinarized';
          }
        },
        {
          text: 'Color Document',
          handler: () => {
            filter = 'ImageFilterTypeColorDocument';
          }
        },
        {
          text: 'Pure Binarized',
          handler: () => {
            filter = 'ImageFilterTypePureBinarized';
          }
        },
        {
          text: 'Background Clean',
          handler: () => {
            filter = 'ImageFilterTypeBackgroundClean';
          }
        },
        {
          text: 'Black And White',
          handler: () => {
            filter = 'ImageFilterTypeBlackAndWhite';
          }
        },
        {
          text: 'Otsu Binarization',
          handler: () => {
            filter = 'ImageFilterTypeOtsuBinarization';
          }
        },
        {
          text: 'Deep Binarization',
          handler: () => {
            filter = 'ImageFilterTypeDeepBinarization';
          }
        },
        {
          text: 'Edge Highlight',
          handler: () => {
            filter = 'ImageFilterTypeEdgeHighlight';
          }
        },
        {
          text: 'Low Light Binarization',
          handler: () => {
            filter = 'ImageFilterTypeLowLightBinarization';
          }
        },
        {
          text: 'Low Light Binarization 2',
          handler: () => {
            filter = 'ImageFilterTypeLowLightBinarization2';
          }
        },
        {
          text: 'Pure Gray',
          handler: () => {
            filter = 'ImageFilterTypePureGray';
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ],
      backdropDismiss: false
    });
    await actionSheet.present();
    await actionSheet.onDidDismiss();

    return filter;
  }

  async applyFilterOnImage(args: { filter?: ImageFilterType | undefined, imageUri?: string | undefined, showLoader?: boolean | undefined }): Promise<ApplyImageFilterResult | undefined> {
    let imageFileUri = args.imageUri;
    if (!imageFileUri)
      imageFileUri = (await this.imageUtils.selectImagesFromLibrary())[0];

    let imageFilter = args.filter;
    if (!imageFilter)
      imageFilter = await this.chooseFilter();

    if (imageFilter) {
      if (args.showLoader == true)
        await this.utils.showLoader();

      return ScanbotSDK.applyImageFilter({ filter: imageFilter, imageFileUri: imageFileUri });
    }
    else
      return undefined;
  }

  async applyFilterOnPage(args: { page: Page, filter?: ImageFilterType | undefined, showLoader?: boolean | undefined }): Promise<Page | undefined> {
    let pageFilter = args.filter;
    if (!pageFilter)
      pageFilter = await this.chooseFilter();

    if (pageFilter) {
      if (args.showLoader == true)
        await this.utils.showLoader();

      return ScanbotSDK.applyImageFilterOnPage({ page: args.page, filter: pageFilter });
    }
    else
      return undefined;
  }

  getLicenseInfo(): Promise<GetLicenseInfoResult> {
    return ScanbotSDK.getLicenseInfo();
  }

  getOCRConfigs(): Promise<GetOCRConfigsResult> {
    return ScanbotSDK.getOCRConfigs();
  }

  cleanup(): Promise<BaseSdkResult> {
    return ScanbotSDK.cleanup();
  }

  removePage(page: Page): Promise<RemovePageResult> {
    return ScanbotSDK.removePage({ page: page });
  }

  saveImagesAsPDF(imageUris: string[]): Promise<CreatePDFResult> {
    return ScanbotSDK.createPDF({ imageFileUris: imageUris, pageSize: 'FIXED_A4' });
  }

  saveImagesAsPDFWithOCR(imageUris: string[]): Promise<PerformOCRResult> {
    return ScanbotSDK.performOCR({ imageFileUris: imageUris, languages: ['en'], options: { outputFormat: 'FULL_OCR_RESULT' } });
  }

  saveResultsAsTIFF(imageUris: string[], binarized: boolean): Promise<WriteTIFFResult> {
    return ScanbotSDK.writeTIFF({
      imageFileUris: imageUris, options: {
        oneBitEncoded: binarized, // "true" means create 1-bit binarized black and white TIFF
        dpi: 300, // optional DPI. default value is 200
        compression: binarized ? 'CCITT_T6' : 'ADOBE_DEFLATE', // optional compression. see documentation!
      }
    });
  }

  cropPage(page: Page): Promise<CroppingResult> {
    return ScanbotSDK.startCroppingScreen({
      page: page,
      configuration: {
        doneButtonTitle: 'Apply',
        topBarBackgroundColor: Colors.scanbotRed,
        bottomBarBackgroundColor: Colors.scanbotRed,
        orientationLockMode: 'NONE',
        swapTopBottomButtons: false
      }
    });
  }

  private getErrorStringFromLicenseStatus(status: LicenseStatus): string {
    switch (status) {
      case 'Okay':
        return 'License key is correct or license status is wrong';
      case 'Trial':
        return 'The trial period has ended';
      case 'Expired':
        return 'The license key has expired!';
      case 'WrongOS':
        return 'The license key does not support the current platform';
      case 'Corrupted':
        return 'The license key seems to be corrupted';
      case 'AppIDMismatch':
        return 'The App ID does not match the license key App ID';
      case 'NotSet':
        return 'The license key has not been set';
      default:
        return 'Unknown error';
    }
  }

  private async getAcceptedBarcodeFormats(): Promise<BarcodeFormat[]> {
    return (await this.getBarcodeSettings()).filter(x => x.accepted).map(x => x.format);
  }

  private async isBarcodeFormatAccepted(barcodeFormat: BarcodeFormat): Promise<boolean> {
    const prefValue = (await Preferences.get({ key: barcodeFormat.toString() })).value;

    if (barcodeFormat === 'UNKNOWN')
      return prefValue === 'true'
    else
      return prefValue !== 'false';
  }

  private async getAcceptedBarcodeDocumentFormats(): Promise<BarcodeDocumentFormat[]> {
    return (await this.getBarcodeDocumentSettings()).filter(x => x.accepted).map(x => x.format);
  }

  private async isBarcodeDocumentFormatAccepted(barcodeDocumentFormat: BarcodeDocumentFormat): Promise<boolean> {
    const prefValue = (await Preferences.get({ key: barcodeDocumentFormat.toString() })).value;

    return prefValue !== 'false';
  }

  async isBarcodeDocumentFormatsEnabled(): Promise<boolean> {
    const prefValue = (await Preferences.get({ key: BARCODE_DOCUMENT_FORMATS_ENABLED_KEY })).value;

    return prefValue === 'true';
  }
}
