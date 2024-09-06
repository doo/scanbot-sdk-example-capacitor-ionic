import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

import { CommonUtils } from 'src/app/utils/common-utils';
import { BarcodeSetting, ScanbotUtils } from 'src/app/utils/scanbot-utils';

@Component({
    selector: 'app-barcode-formats',
    templateUrl: './barcode-formats.page.html',
    styleUrls: ['./barcode-formats.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
})
export class BarcodeFormatsPage implements OnInit {
    private utils = inject(CommonUtils);
    private scanbotUtils = inject(ScanbotUtils);

    barcodeSettings!: BarcodeSetting[];

    constructor() { }

    async ngOnInit() {
        this.barcodeSettings = await this.scanbotUtils.getBarcodeSettings();
    }

    getBackButtonText() {
        return this.utils.isiOSPlatform() ? 'Home' : '';
    }

    async barcodeSettingStateChanged(event: any, barcode: BarcodeSetting) {
        await this.scanbotUtils.setBarcodeFormatAccepted(
            barcode.format,
            event.target.checked
        );
    }
}
