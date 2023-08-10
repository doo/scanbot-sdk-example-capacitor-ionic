import { Component, OnInit } from '@angular/core';
import { ScanbotService } from '../services/scanbot-service.service';
import { MedicalCertificateScannerResult } from 'capacitor-plugin-scanbot-sdk';

@Component({
	selector: 'app-medical-certificate-scanner',
	templateUrl: './medical-certificate-scanner.page.html',
	styleUrls: ['./medical-certificate-scanner.page.scss'],
})
export class MedicalCertificateScannerPage implements OnInit {

	constructor(private ScanbotSdk: ScanbotService) { }

	ngOnInit() {
	}

	isResultModalOpen: boolean = false;

	medCertResult: MedicalCertificateScannerResult | undefined;

	setOpen(isOpen: boolean) {
		this.isResultModalOpen = isOpen;
	}

	async openMedScanner() {
		this.medCertResult = await this.ScanbotSdk.showMedicalCertificateRecognizer()
		if (this.medCertResult.status === "CANCELED") {
			return;
		}
		this.isResultModalOpen = true;
	}
}
