import { Injectable, inject } from '@angular/core';
import { CommonUtils } from '../utils/common-utils';
import { ImageUtils } from '../utils/image-utils';
import { FileUtils } from '../utils/file-utils';
import { ModalController } from '@ionic/angular';
import { Colors } from 'src/theme/theme';
import { Preferences } from '@capacitor/preferences';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { ImageFilterComponent } from '../image-filter/image-filter.component';

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

export interface ImageFilter {
  title: string,
  type: ImageFilterType,
}

@Injectable({
  providedIn: 'root'
})
export class ScanbotService {

  private utils = inject(CommonUtils);
  private imageUtils = inject(ImageUtils);
  private fileUtils = inject(FileUtils);
  private modalCtrl = inject(ModalController);

  // set your key here
  private licenseKey = "";

  // !! Please read note !!
  // It is strongly recommended to use the default (secure) storage location of the Scanbot SDK.
  // However, for demo purposes we overwrite the "storageBaseDirectory" of the Scanbot SDK by a custom storage directory.
  //
  // On Android we will use the primary shared/external storage device where the application can place persistent files it owns.
  // On iOS, we will use the Documents directory.
  //
  // For more details about the storage system of the Scanbot SDK Capacitor Module please see our docs:
  // - https://docs.scanbot.io/document-scanner-sdk/capacitor/introduction/
  //
  // For more details about the file system on Android and iOS we also recommend to check out:
  // - https://developer.android.com/training/data-storage
  // - https://developer.apple.com/documentation/foundation/filemanager
  private readonly storageBaseDirectoryUri = Filesystem.getUri({ path: 'my-custom-storage', directory: Directory.External });

  readonly SCANBOT_IMAGES_FILE_FORMAT: CameraImageFormat = 'JPG'
  readonly FILE_ENCRYPTION_ENABLED: boolean = false

  constructor() { }

  async initializeSDK() {
    let storageBaseDirectoryPath = (await this.storageBaseDirectoryUri).uri;
    if (storageBaseDirectoryPath.startsWith('file://'))
      storageBaseDirectoryPath = storageBaseDirectoryPath.slice(7);

    try {
      const result = await ScanbotSDK.initializeSDK({
        licenseKey: this.licenseKey,
        loggingEnabled: true,
        storageImageFormat: this.SCANBOT_IMAGES_FILE_FORMAT, // Format of stored images
        storageImageQuality: 80, // Quality of stored images
        storageBaseDirectory: storageBaseDirectoryPath, // Custom storage path
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

  getImageFilters(): ImageFilter[] {
    return [
      { title: 'None', type: 'ImageFilterTypeNone' },
      { title: 'Color', type: 'ImageFilterTypeColor' },
      { title: 'Gray', type: 'ImageFilterTypeGray' },
      { title: 'Binarized', type: 'ImageFilterTypeBinarized' },
      { title: 'Color Document', type: 'ImageFilterTypeColorDocument' },
      { title: 'Pure Binarized', type: 'ImageFilterTypePureBinarized' },
      { title: 'Background Clean', type: 'ImageFilterTypeBackgroundClean' },
      { title: 'Black And White', type: 'ImageFilterTypeBlackAndWhite' },
      { title: 'Otsu Binarization', type: 'ImageFilterTypeOtsuBinarization' },
      { title: 'Deep Binarization', type: 'ImageFilterTypeDeepBinarization' },
      { title: 'Edge Highlight', type: 'ImageFilterTypeEdgeHighlight' },
      { title: 'Low Light Binarization', type: 'ImageFilterTypeLowLightBinarization' },
      { title: 'Low Light Binarization 2', type: 'ImageFilterTypeLowLightBinarization2' },
      { title: 'Pure Gray', type: 'ImageFilterTypePureGray' }
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

    let page = await ScanbotSDK.createPage({ imageUri: imageFileUri });
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
    const config: MrzScannerConfiguration = {
      finderTextHint:
        'Please hold your phone over the 2- or 3-line MRZ code at the front of your passport'
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
        capturing: 'Capturing',
        scanning: 'Recognizing',
        processing: 'Processing',
        startScanning: 'Scanning started',
        paused: 'Paused',
        energySaving: 'Energy saving',
      },
      errorDialogMessage: 'An unexpected error occured.',
      errorDialogOkButton: 'OK',
      errorDialogTitle: 'ERROR',
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
    const filterModal = await this.modalCtrl.create({
      component: ImageFilterComponent,
      id: 'image-filter',
      backdropDismiss: true
    });
    await filterModal.present();

    const selectedFilterType: ImageFilterType | undefined = (await filterModal.onDidDismiss()).data;
    return selectedFilterType;
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
    return ScanbotSDK.performOCR({ imageFileUris: imageUris, languages: ['en', 'de'], options: { outputFormat: 'FULL_OCR_RESULT' } });
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
