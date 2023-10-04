import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

import { ScanbotService } from '../services/scanbot-service.service';

import { NavigationExtras, Router } from '@angular/router';
import { Camera } from '@capacitor/camera';
import { StringSelectorModalComponent } from '../string-selector-modal/string-selector-modal.component';
import { ModalController } from '@ionic/angular';
import { BarcodeResultField, ImageFilterType } from 'capacitor-plugin-scanbot-sdk';
import { DemoRuntimeStorage } from '../services/demo-runtime-storage';

@Component({
	selector: 'app-mainpage',
	templateUrl: './mainpage.page.html',
	styleUrls: ['./mainpage.page.scss'],
})
export class MainpagePage implements OnInit {

	constructor(
		private location: Location, 
		public scanbot: ScanbotService, 
		private router: Router,
		private modalController: ModalController
	) {
	}

	public isLicenseOk: boolean = false
	public isInitialized: boolean = false

	async checkLicense(): Promise<boolean> {
		this.isLicenseOk = (await this.scanbot.getLicenseInfo()).isLicenseValid;
		this.isInitialized = await this.scanbot.isSdkInitialized();
		return this.isLicenseOk && this.isInitialized;
	}

	async ngOnInit() {
		await this.scanbot.initSdk();
		this.checkLicense();

		console.log("Cleaning up storage...");
		await this.scanbot.cleanup();
	}

	async openDocScannerClick() {
		if (!await this.checkLicense()) {
			return
		}
		try {
			const result = await this.scanbot.showDocumentScanner();
			if (result.pages.length > 0) {
				// Add the scanned pages to the demo runtime storage
				DemoRuntimeStorage.default.addPages(result.pages);
				// Navigate to document-results and pass pageIds as pages to display.
				this.router.navigate(['/document-results']);
			}
		} catch (error) {
			console.error(error);
		}
	}

	async openFinderDocScannerClick() {
		if (!await this.checkLicense()) {
			return
		}
		try {
			const result = await this.scanbot.showFinderDocumentScanner();

			console.log(JSON.stringify(result, null, 4));

			if (result.pages.length > 0) {
				// Add the scanned pages to the demo runtime storage
				DemoRuntimeStorage.default.addPages(result.pages);

				// Navigate to document-results and pass pageIds as pages to display.
				this.router.navigate(['/document-results']);
			}
		} catch (error) {
			console.error(error);
		}
	}

	async importImageAndDetectBarcodes() {
		const res = await Camera.pickImages({})
		const pictures = await Promise.all(res.photos.filter(async (photo) => { photo.path !== undefined; }).map(async (photo) => {
			return photo.path!
		}))

		if (pictures.length == 0) {
			return;
		}
		
		// Barcode Results
		let barcodeResults: BarcodeResultField[] = []

		// If it's only one picture, we use 'detectBarcodesOnImage'
		if (pictures.length == 1) {
			const imageFilePath = pictures[0]
			const result = await this.scanbot.detectBarcodesOnImage(imageFilePath)
	
			barcodeResults = result.barcodes
		} 
		// If it's MORE than one picture, we can use the optimized 'detectBarcodesOnImages'
		else {
			const result = await this.scanbot.detectBarcodesOnImages(pictures)
			
			result.results.forEach((item) => {
				item.barcodeResults?.forEach((barcode) => {
					barcodeResults.push(barcode)
				})
			})
		}

		const navigationExtras: NavigationExtras = {
			state: { result: barcodeResults }
		};

		this.router.navigate(['/barcode-results'], navigationExtras)

	}

	async importImageAndRecognizeCheck() {
		const res = await Camera.pickImages({limit:1})
		const pictures = await Promise.all(res.photos.filter(async (photo) => { photo.path !== undefined; }).map(async (photo) => {
			return photo.path!
		}))
		const imageFilePath = pictures[0]
		const result = await this.scanbot.recognizeCheckOnImage(imageFilePath)

		const navigationExtras: NavigationExtras = {
			state: { result: result }
		};

		this.router.navigate(['/check-results'], navigationExtras)
	}

	async applyFilterOnImage() {
		const res = await Camera.pickImages({limit:1})
		const pictures = await Promise.all(res.photos.filter(async (photo) => { photo.path !== undefined; }).map(async (photo) => {
			return photo.path!
		}))
		const imageFilePath = pictures[0];
		
		const filter = await this.openModalAndGetStringValue([
			'NONE',
			'COLOR_ENHANCED',
			'GRAYSCALE',
			'PURE_GRAYSCALE',
			'BINARIZED',
			'COLOR_DOCUMENT',
			'PURE_BINARIZED',
			'BACKGROUND_CLEAN',
			'BLACK_AND_WHITE',
			'OTSU_BINARIZATION',
			'DEEP_BINARIZATION',
			'LOW_LIGHT_BINARIZATION',
			'EDGE_HIGHLIGHT',
			'LOW_LIGHT_BINARIZATION_2'
		]) as ImageFilterType;

		if (!filter) {
			console.log("Filter is undefined");
			return;
		}

		const result = await this.scanbot.applyImageFilter(imageFilePath, filter)
		const filteredImageUri = result.imageFileUri;
		
		await this.navigateToImagePreview(filteredImageUri)
	}

	async navigateToImagePreview(imageFileUri: string) {
		await this.router.navigate(['/image-preview', imageFileUri]);
	}

	async openModalAndGetStringValue(values: string[]): Promise<string | undefined> {
		const modal = await this.modalController.create({
		  component: StringSelectorModalComponent,
		  componentProps: {
			stringValues: values
		  }
		});

		const result = modal.onDidDismiss().then((result) => {
			if (result.role === 'selected') {
			  return result.data as string;
			}

			return undefined;
		});

		await modal.present();

		return result;
	  }
}
