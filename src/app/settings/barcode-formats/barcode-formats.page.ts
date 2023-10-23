import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonUtils } from 'src/app/utils/common-utils';
import { BarcodeSetting, ScanbotService } from 'src/app/services/scanbot.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-barcode-formats',
  templateUrl: './barcode-formats.page.html',
  styleUrls: ['./barcode-formats.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BarcodeFormatsPage implements OnInit {

  private utils = inject(CommonUtils);
  private scanbot = inject(ScanbotService);

  barcodeSettings!: BarcodeSetting[]

  constructor() { }

  async ngOnInit() {
    this.barcodeSettings = await this.scanbot.getBarcodeSettings();
  }

  getBackButtonText() {
    return this.utils.isiOSPlatform() ? 'Home' : '';
  }

  async barcodeSettingStateChanged(event: any, barcode: BarcodeSetting) {
    await Preferences.set({ key: barcode.format.toString(), value: event.target.checked.toString() });
  }
}
