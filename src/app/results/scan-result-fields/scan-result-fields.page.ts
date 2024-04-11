import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { CommonUtils } from 'src/app/utils/common-utils';
import { ScanResultSectionList, SectionListComponent } from "./section-list/section-list.component";


@Component({
    selector: 'app-scan-result-fields',
    templateUrl: './scan-result-fields.page.html',
    styleUrls: ['./scan-result-fields.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, SectionListComponent],
})
export class ScanResultFieldsPage implements OnInit {
    pageTitle: string = 'Scan Result';
    sectionListData: ScanResultSectionList = [];

    activatedRoute = inject(ActivatedRoute);
    utils = inject(CommonUtils);

    constructor() {
    }

    async ngOnInit() {
        this.sectionListData = this.loadResultFields();
    }

    getBackButtonText() {
        return this.utils.isiOSPlatform() ? 'Home' : '';
    }

    loadResultFields(): ScanResultSectionList {
        return [];
    }
}
