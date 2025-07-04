import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CommonUtils } from 'src/app/utils/common-utils';
import { ScanbotUtils } from 'src/app/utils/scanbot-utils';

export type ScanResultSectionData = {
  image?: string;
  key: string;
  value: string;
};

export type ScanResultSection = {
  header?: string;
  image?: string;
  data?: Array<ScanResultSectionData>;
};

@Component({
  selector: 'app-scan-result',
  templateUrl: './scan-result.page.html',
  styleUrls: ['./scan-result.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ScanResultFieldsPage implements OnInit {
  pageTitle: string = 'Scan Result';
  @Input() sectionListData: Array<ScanResultSection> = [];

  activatedRoute = inject(ActivatedRoute);
  utils = inject(CommonUtils);
  scanbotUtils = inject(ScanbotUtils);

  constructor() {}

  async ngOnInit() {
    this.sectionListData = this.loadResultFields();
  }

  getBackButtonText() {
    return this.utils.isiOSPlatform() ? 'Home' : '';
  }

  loadResultFields(): Array<ScanResultSection> {
    return [];
  }
}
