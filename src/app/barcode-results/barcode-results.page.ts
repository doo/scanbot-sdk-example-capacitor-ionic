import { Component, OnInit } from '@angular/core';
import { BarcodeResult, BarcodeResultField } from 'capacitor-plugin-scanbot-sdk/';
import { ScanbotService } from '../services/scanbot-service.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-barcode-results',
	templateUrl: './barcode-results.page.html',
	styleUrls: ['./barcode-results.page.scss'],
})
export class BarcodeResultsPage implements OnInit {

	constructor(private scanbot: ScanbotService, private router: Router) { }

	barcodes: BarcodeResultField[] = []
	isRtu = true
	isResultModalOpen: boolean = false

	ngOnInit(): void {
		const result = this.router.getCurrentNavigation()?.extras?.state?.['result']
		if (result !== undefined) {
			this.barcodes = result as BarcodeResultField[]
			this.isRtu = false
			this.setOpen(true)
		}
	}

	setOpen(state: boolean) {
		this.isResultModalOpen = state
	}

	async openBarcodeScanner() {
		try {
			const result = await this.scanbot.showBarcodeScanner();
			if (result.status == "CANCELED") {
				return;
			}
			this.barcodes = result.barcodes ?? [];
			this.isResultModalOpen = true;
		} catch (e) {
			console.error(e);
		}
	}

	async openBatchBarcodeScanner() {
		try {
			const result = await this.scanbot.showBatchBarcodeScanner();
			if (result.status == "CANCELED") {
				return;
			}
			this.barcodes = result.barcodes ?? [];
			this.isResultModalOpen = true;
		} catch (e) {
			console.error(e);
		}
	}
}
