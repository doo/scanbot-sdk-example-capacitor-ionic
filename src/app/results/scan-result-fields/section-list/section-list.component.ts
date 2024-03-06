import {Component, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Field} from "capacitor-plugin-scanbot-sdk";

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
    imports: [
        IonicModule,
        NgForOf,
        NgIf,
        NgOptimizedImage
    ],
    standalone: true
})
export class SectionListComponent implements OnInit {

    @Input()sectionListData: ScanResultSectionList = []

    constructor() {
    }

    ngOnInit() {
    }

}
