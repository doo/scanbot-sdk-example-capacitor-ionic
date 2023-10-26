import { Injectable } from '@angular/core';
import { ApplyImageFilterResult, BaseSdkResult, CheckRecognizerResult, CroppingConfiguration, DetectBarcodesOnImageResult, DetectBarcodesOnImagesResult, EstimateBlurResult, GetImageDataResult, PageFileType, PerformOCRResult, RecognizeCheckResult, RemovePageResult, ScanbotSDK, Status, TextDataScannerResult } from 'capacitor-plugin-scanbot-sdk';
import {
	BarcodeResult,
	CroppingResult,
	DocumentScannerResult,
	GenericDocumentRecognizerResult,
	HealthInsuranceCardScannerResult,
	ImageFilterType,
	LicenseInfo,
	LicensePlateScannerResult,
	MedicalCertificateScannerResult,
	MrzResult,
	PDFPageSize,
	Page
} from 'capacitor-plugin-scanbot-sdk';

export class DisplayImageFilter {
	filterType: ImageFilterType;
	displayName: string;

	constructor(filterType: ImageFilterType, displayName: string) {
		this.filterType = filterType;
		this.displayName = displayName;
	}
}

@Injectable({
	providedIn: 'root',
})
export class ScanbotService {

	public readonly displayFilters: DisplayImageFilter[];

	constructor() { 
		this.displayFilters = [
			new DisplayImageFilter('ImageFilterTypeBackgroundClean', 'Background Clean'),
			new DisplayImageFilter('ImageFilterTypeBinarized', 'Binarized'),
			new DisplayImageFilter('ImageFilterTypeBlackAndWhite', 'Black and White'),
			new DisplayImageFilter('ImageFilterTypeColor', 'Color'),
			new DisplayImageFilter('ImageFilterTypeColorDocument', 'Color Document'),
			new DisplayImageFilter('ImageFilterTypeDeepBinarization', 'Deep Binarization'),
			new DisplayImageFilter('ImageFilterTypeEdgeHighlight', 'Edge Highlight'),
			new DisplayImageFilter('ImageFilterTypeGray', 'Gray'),
			new DisplayImageFilter('ImageFilterTypeLowLightBinarization', 'Low Light Binarization'),
			new DisplayImageFilter('ImageFilterTypeLowLightBinarization2', 'Low Light Binarization 2'),
			new DisplayImageFilter('ImageFilterTypeNone', 'None'),
			new DisplayImageFilter('ImageFilterTypeOtsuBinarization', 'OtsuBinarization'),
			new DisplayImageFilter('ImageFilterTypePureBinarized', 'Pure Binarized'),
			new DisplayImageFilter('ImageFilterTypePureGray', 'Gray'),
		]
	}

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

	public async showFinderDocumentScanner(): Promise<DocumentScannerResult> {
		return ScanbotSDK.startFinderDocumentScanner({
			finderLineWidth: 4,
			finderLineColor: '#ffffff',
			userGuidanceTextColor: '#0000ff',
			userGuidanceBackgroundColor: '#00ffff',
			textHintNothingDetected: 'Please scan your document'
		})
	}

	public async showCropUi(page: Page): Promise<CroppingResult> {
		return ScanbotSDK.startCroppingScreen({page: page, configuration: {
			// Configure UI, Text and Behavior here...
		}})
	}

	public async addPageFromImage(imageFileUri: string): Promise<Page> {
		const sanitize = (uri: string) => {
			let fixedPath = uri
				.replace('file://', '')
				.replace('file:/', '')
				.replace('file:', '')

			return fixedPath.startsWith('/') ? fixedPath : `/${fixedPath}`
		}

		return ScanbotSDK.createPage({imageUri: sanitize(imageFileUri)});
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

	public async applyImageFilterOnPage(page: Page, ImageFilterType: ImageFilterType): Promise<Page> {
		return ScanbotSDK.applyImageFilterOnPage({page: page, filter: ImageFilterType})
	}

	public async writeTiff(imageFileUris: string[]): Promise<string> {
		return (await ScanbotSDK.writeTIFF({imageFileUris: imageFileUris, options:{
			oneBitEncoded: false, dpi: 300, compression: "ADOBE_DEFLATE"
		}})).tiffFileUri
	}

	public async writePdf(imageFileUris: string[], pageSize: PDFPageSize): Promise<string> {
		return (await ScanbotSDK.createPDF({imageFileUris: imageFileUris, pageSize: pageSize})).pdfFileUri;
	}

	public async performOCR(imageFileUris: string[]): Promise<PerformOCRResult> {
		return (await ScanbotSDK.performOCR({
			imageFileUris: imageFileUris,
			languages: ["en", "de"],
			options: {
				outputFormat: 'FULL_OCR_RESULT'
			}
		}))
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

	public async applyImageFilter(imageFilePath: string, filter: ImageFilterType): Promise<ApplyImageFilterResult> {
		return (await ScanbotSDK.applyImageFilter({
			imageFileUri: imageFilePath,
			filter: filter
		}));
	}

	public async getImageData(imageFileUri: string): Promise<GetImageDataResult> {
		return ScanbotSDK.getImageData({imageFileUri})
	}

	public async estimateBlur(imageFileUri: string): Promise<EstimateBlurResult> {
		return ScanbotSDK.estimateBlur({imageFileUri});
	} 

	public async cleanup(): Promise<BaseSdkResult> {
		return ScanbotSDK.cleanup();
	}

	// TODO: Deprecate
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