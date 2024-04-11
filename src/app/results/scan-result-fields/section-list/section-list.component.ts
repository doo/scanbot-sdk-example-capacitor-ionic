import { Component, Input } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { Field } from "capacitor-plugin-scanbot-sdk";

export type ScanResultSectionData = {
    key: string;
    value?: string;
    image?: string;
    field?: Field;
};

export type ScanResultSection = {
    title: string;
    data: ScanResultSectionData[];
};

export type ScanResultSectionList = Array<ScanResultSection>

@Component({
    selector: 'app-section-list',
    templateUrl: './section-list.component.html',
    styleUrls: ['./section-list.component.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
})
export class SectionListComponent {

    @Input() sectionListData: ScanResultSectionList = []

    constructor() {
    }
}
