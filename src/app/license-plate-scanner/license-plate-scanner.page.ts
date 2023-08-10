import { Component, OnInit } from '@angular/core';
import { ScanbotService } from '../services/scanbot-service.service';
import { LicensePlateScannerResult } from 'capacitor-plugin-scanbot-sdk/';

@Component({
	selector: 'app-license-plate-scanner',
	templateUrl: './license-plate-scanner.page.html',
	styleUrls: ['./license-plate-scanner.page.scss'],
})
export class LicensePlateScannerPage implements OnInit {

	constructor(private scanbotSdk: ScanbotService) { }

	ngOnInit() {
	}

	public plateResult: LicensePlateScannerResult | undefined;

	public isResultModalOpen: boolean = false;

	setOpen(isOpen: boolean) {
		this.isResultModalOpen = isOpen;
	}

	async openLicensePlateScanner() {
		this.plateResult = await this.scanbotSdk.showLicensePlateScanner()
		if (this.plateResult.status === 'CANCELED') {
			return;
		}
		this.isResultModalOpen = true;
	}

}
