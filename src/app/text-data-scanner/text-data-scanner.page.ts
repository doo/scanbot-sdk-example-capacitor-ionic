import { Component, OnInit } from '@angular/core';
import { ScanbotService } from '../services/scanbot-service.service';

@Component({
    selector: 'app-text-data-scanner',
    templateUrl: './text-data-scanner.page.html',
    styleUrls: ['./text-data-scanner.page.scss'],
})
export class TextDataScannerPage implements OnInit {

    isResultModalOpen: boolean = false;
    result: {
        text: String;
        confidence: number;
    } = { text: "", confidence: 0 }

    constructor(private scanbotService: ScanbotService) { }

    ngOnInit() {
    }

    setOpen(isOpen: boolean) {
        this.isResultModalOpen = isOpen;
    }

    async openTextDataScanner() {
        const result = await this.scanbotService.showTextDataScanner()
        const textResult = result.result;
        if (result.status === "CANCELED" || !textResult) {
            return;
        }

        this.isResultModalOpen = true;
        this.result = textResult;
    }
}
