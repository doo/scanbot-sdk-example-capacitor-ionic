import { Injectable } from '@angular/core';
import { ApplyImageFilterResult, CheckRecognizerResult, DetectBarcodesOnImageResult, DetectBarcodesOnImagesResult, PageFileType, RecognizeCheckResult, RemovePageResult, ScanbotSDK, Status, TextDataScannerResult } from 'capacitor-plugin-scanbot-sdk';
import {
	BarcodeResult,
	CroppingResult,
	DocumentScannerResult,
	GenericDocumentRecognizerResult,
	HealthInsuranceCardScannerResult,
	ImageFilter,
	LicenseInfo,
	LicensePlateScannerResult,
	MedicalCertificateScannerResult,
	MrzResult,
	PDFPageSize,
	Page
} from 'capacitor-plugin-scanbot-sdk';

@Injectable({
	providedIn: 'root',
})
export class ScanbotService {
	constructor() { }

	public async initSdk() {
		await ScanbotSDK.initializeSDK({
			allowGpuAcceleration: true, 
			allowXnnpackAcceleration: true,
			licenseKey: ''
		});
		// pass your license here ↑
	}

	public async showDocumentScanner(): Promise<DocumentScannerResult> {
		return ScanbotSDK.startDocumentScanner({
			userGuidanceTextColor: '#0000ff',
			userGuidanceBackgroundColor: '#00ffff',
			textHintNothingDetected: 'Please scan your document'
		});
	}

	public async showCropUi(page: Page): Promise<CroppingResult> {
		return ScanbotSDK.startCroppingScreen({page: page, configuration: {
			// Configure UI, Text and Behavior here...
		}})
	}

	public async showGenericDocScanner(): Promise<GenericDocumentRecognizerResult> {
		return ScanbotSDK.startGenericDocumentRecognizer({});
	}

	public async addPageFromImage(imageFileUri: string): Promise<Page> {
		return ScanbotSDK.createPage({imageUri: imageFileUri});
	}

	public async detectDocumentOnPage(page: Page): Promise<Page> {
		return  ScanbotSDK.detectDocumentOnPage({page: page});
	}

	public async showMrzScanner(): Promise<MrzResult> {
		return ScanbotSDK.startMrzScanner({});
	}

	public async showBarcodeScanner(): Promise<BarcodeResult> {
		return ScanbotSDK.startBarcodeScanner({});
	}

	public async showBatchBarcodeScanner(): Promise<BarcodeResult> {
		return ScanbotSDK.startBatchBarcodeScanner({});
	}

	public async showCheckRecognizer(): Promise<CheckRecognizerResult & { status: Status }> {
		return ScanbotSDK.startCheckRecognizer({});
	}

	public async showEHICScanner(): Promise<HealthInsuranceCardScannerResult> {
		return ScanbotSDK.startEHICScanner({ flashEnabled: true });
	}

	public async showLicensePlateScanner(): Promise<LicensePlateScannerResult> {
		return ScanbotSDK.startLicensePlateScanner({});
	}

	public async showGenericDocumentRecognizer(): Promise<GenericDocumentRecognizerResult> {
		return ScanbotSDK.startGenericDocumentRecognizer({ flashEnabled: true });
	}

	public async showMedicalCertificateRecognizer(): Promise<MedicalCertificateScannerResult> {
		return ScanbotSDK.startMedicalCertificateRecognizer({});
	}

	public async showTextDataScanner(): Promise<TextDataScannerResult> {
		return ScanbotSDK.startTextDataScanner({
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
			  },
		});
	}

	public async isSdkInitialized(): Promise<boolean> {
		return (await ScanbotSDK.getLicenseInfo()).isLicenseValid;
	}

	public async getLicenseInfo(): Promise<LicenseInfo> {
		return ScanbotSDK.getLicenseInfo();
	}

	public removePage(page: Page): Promise<RemovePageResult> {
		return ScanbotSDK.removePage({page: page});
	}

	public async applyImageFilterOnPage(page: Page, imageFilter: ImageFilter): Promise<Page> {
		return ScanbotSDK.applyImageFilterOnPage({page: page, filter: imageFilter})
	}

	public async writeTiff(imageFileUris: string[]): Promise<string> {
		return (await ScanbotSDK.writeTIFF({imageFileUris: imageFileUris, options:{
			oneBitEncoded: false, dpi: 300, compression: "ADOBE_DEFLATE"
		}})).tiffFileUri
	}

	public async writePdf(imageFileUris: string[], pageSize: PDFPageSize): Promise<string> {
		return (await ScanbotSDK.createPDF({imageFileUris: imageFileUris, pageSize: pageSize})).pdfFileUri;
	}

	public async refreshImages(pages: Page[]): Promise<Page[]> {
		return (await ScanbotSDK.refreshImageUris({ pages })).pages;
	}

	public async detectBarcodesOnImage(imageFilePath: string): Promise<DetectBarcodesOnImageResult> {
		return (await ScanbotSDK.detectBarcodesOnImage({imageFileUri: imageFilePath}))
	}

	public async detectBarcodesOnImages(imageFilePaths: string[]): Promise<DetectBarcodesOnImagesResult> {
		return (await ScanbotSDK.detectBarcodesOnImages({imageFileUris: imageFilePaths}))
	}

	public async recognizeCheckOnImage(imageFilePath: string): Promise<RecognizeCheckResult> {
		return (await ScanbotSDK.recognizeCheck({imageFileUri: imageFilePath}))
	}

	public async applyImageFilter(imageFilePath: string, filter: ImageFilter): Promise<ApplyImageFilterResult> {
		return (await ScanbotSDK.applyImageFilter({
			imageFileUri: imageFilePath,
			filter: filter
		}));
	}

	// TODO: Include in SDK
	public getStoredPageIds(): Promise<{ pageIds: string[] }> {
		return (ScanbotSDK as any).getStoredPageIds();
	}

	public getPageUris(type: PageFileType, fileIds: string[]): Promise<{ uris: (string | undefined)[] }> {
		return (ScanbotSDK as any).getPageImageUris({ preview: false, kind: type, pageIds: fileIds });
	}

	public getPagePreviewUris(type: PageFileType, fileIds: string[]): Promise<{ uris: (string | undefined)[] }> {
		return (ScanbotSDK as any).getPageImageUris({ preview: true, kind: type, pageIds: fileIds });
	}

	public async getPageById(pageId: string): Promise<Page> {
		return (ScanbotSDK as any).getPageById({ pageId: pageId });
	}
}