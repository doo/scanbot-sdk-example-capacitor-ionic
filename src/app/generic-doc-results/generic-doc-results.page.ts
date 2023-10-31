import { Component, OnInit } from '@angular/core';
import { ScanbotService } from '../services/scanbot-service.service';
import { GenericDocumentRecognizerResult } from 'capacitor-plugin-scanbot-sdk/';

@Component({
	selector: 'app-generic-doc-results',
	templateUrl: './generic-doc-results.page.html',
	styleUrls: ['./generic-doc-results.page.scss'],
})
export class GenericDocResultsPage implements OnInit {

	constructor(private scanbotSdk: ScanbotService) { }

	ngOnInit() {
	}

	public genericDocResult: GenericDocumentRecognizerResult | undefined
	public isResultModalOpen: boolean = false

	setOpen(state: boolean) {
		this.isResultModalOpen = state
	}

	async openGenericDocRecognizer() {
		this.genericDocResult = (await this.scanbotSdk.showGenericDocumentRecognizer());
		if (this.genericDocResult.status === "CANCELED") {
			return;
		}
		this.isResultModalOpen = true;
	}
}
