import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonUtils } from 'src/app/utils/common-utils';
import { BARCODE_DOCUMENT_FORMATS_ENABLED_KEY, BarcodeDocumentSetting, ScanbotService } from 'src/app/services/scanbot.service';
import { Preferences } from '@capacitor/preferences';

@Component({
    selector: 'app-barcode-document-formats',
    templateUrl: './barcode-document-formats.page.html',
    styleUrls: ['./barcode-document-formats.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule]
    })
export class BarcodeDocumentFormatsPage implements OnInit {

  private utils = inject(CommonUtils);
  private scanbot = inject(ScanbotService);

  documentFormatsEnabled!: boolean
  documentSettings!: BarcodeDocumentSetting[]

  constructor() { }

  async ngOnInit() {
      this.documentFormatsEnabled = await this.scanbot.isBarcodeDocumentFormatsEnabled();
      this.documentSettings = await this.scanbot.getBarcodeDocumentSettings();
  }

  getBackButtonText() {
      return this.utils.isiOSPlatform() ? 'Home' : '';
  }

  async documentFormatsEnabledStateChanged(event: any) {
      this.documentFormatsEnabled = event.target.checked;

      await Preferences.set({ key: BARCODE_DOCUMENT_FORMATS_ENABLED_KEY, value: this.documentFormatsEnabled.toString() });
  }

  async documentSettingStateChanged(event: any, document: BarcodeDocumentSetting) {
      await Preferences.set({ key: document.format.toString(), value: event.target.checked.toString() });
  }
}
