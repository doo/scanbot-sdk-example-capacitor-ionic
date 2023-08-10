import { Component, OnInit } from '@angular/core';
import { ScanbotService } from '../services/scanbot-service.service';

@Component({
	selector: 'app-ehci-results',
	templateUrl: './ehci-results.page.html',
	styleUrls: ['./ehci-results.page.scss'],
})
export class EhciResultsPage implements OnInit {

	constructor(private scanbot: ScanbotService) { }

	ngOnInit() {
	}

	fields: {
		type: string;
		value: string;
		/** Confidence of the scanned value. */
		confidence: number;
	}[] = [];
	isResultModalOpen: boolean = false

	setOpen(state: boolean) {
		this.isResultModalOpen = state
	}

	async openEHICScanner() {
		try {
			const result = await this.scanbot.showEHICScanner();
			if (result.status === "CANCELED") {
				return;
			}
			this.fields = result.fields ?? [];
			this.isResultModalOpen = true;
		} catch (e) {
			console.error(e);
		}
	}
}
