import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonUtils } from 'src/app/utils/common-utils';
import { ActivatedRoute } from '@angular/router';

export interface ScanResultFieldsSection {
  title: string,
  fields: ScanResultField[]
}

export interface ScanResultField {
  key: string,
  value?: string | undefined,
  fieldPhotoPreviewWebViewPath?: string | undefined
  showPhotoOnly?: boolean | undefined
}

@Component({
    selector: 'app-scan-result-fields',
    templateUrl: './scan-result-fields.page.html',
    styleUrls: ['./scan-result-fields.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule]
    })
export class ScanResultFieldsPage implements OnInit {

  pageTitle: string = 'Scan Result'
  resultFields: ScanResultFieldsSection[] = [];

  activatedRoute = inject(ActivatedRoute);
  utils = inject(CommonUtils);

  constructor() { }

  async ngOnInit() {
      this.resultFields = this.loadResultFields();
  }

  getBackButtonText() {
      return this.utils.isiOSPlatform() ? 'Home' : '';
  }

  loadResultFields(): ScanResultFieldsSection[] {
      return [];
  }
}
