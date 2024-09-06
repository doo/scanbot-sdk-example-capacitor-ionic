import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { CommonUtils } from 'src/app/utils/common-utils';
import { ScanbotUtils } from 'src/app/utils/scanbot-utils';

export type ScanResultSectionData = {
    key: string;
    value: string;
};

export type ScanResultSection = {
    title?: string;
    subtitle?: string;
    image?: string;
    data?: Array<ScanResultSectionData>;
};

@Component({
    selector: 'app-scan-result-fields',
    templateUrl: './scan-result-fields.page.html',
    styleUrls: ['./scan-result-fields.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
})
export class ScanResultFieldsPage implements OnInit {
    pageTitle: string = 'Scan Result';
    @Input() sectionListData: Array<ScanResultSection> = []

    activatedRoute = inject(ActivatedRoute);
    utils = inject(CommonUtils);
    scanbotUtils = inject(ScanbotUtils);

    constructor() {
    }

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
