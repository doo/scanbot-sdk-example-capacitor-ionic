import { Component, OnInit } from '@angular/core';
import { ScanbotService } from '../services/scanbot-service.service';
import { MrzResult } from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-mrz-scanner',
  templateUrl: './mrz-scanner.page.html',
  styleUrls: ['./mrz-scanner.page.scss'],
})
export class MrzScannerPage implements OnInit {

  isResultModalOpen: boolean = false;

	mrzResult: MrzResult | undefined;

  fields: {
    /** The name of the field. */
    name: string;
    /** The value of the field. */
    value: string;
    /** The confidence in the recognized data. */
    confidence: number;
  }[] = [];

  constructor(private ScanbotSdk: ScanbotService) { }

  ngOnInit() {
  }

	setOpen(isOpen: boolean) {
		this.isResultModalOpen = isOpen;
	}

	async openMRZScanner() {
		this.mrzResult = await this.ScanbotSdk.showMrzScanner()
		if (this.mrzResult.status === "CANCELED") {
      return;
		}

    this.isResultModalOpen = true;
    this.fields = this.mrzResult.fields;
	}

}
