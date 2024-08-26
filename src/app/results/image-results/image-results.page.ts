import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { CommonUtils } from 'src/app/utils/common-utils';
import { Capacitor } from '@capacitor/core';

@Component({
    selector: 'app-image-results',
    templateUrl: './image-results.page.html',
    styleUrls: ['./image-results.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
})
export class ImageResultsPage implements OnInit {
    @Input() imagePreviewWebViewPaths!: string[];

    private activatedRoute = inject(ActivatedRoute);
    private utils = inject(CommonUtils);

    constructor() { }

    async ngOnInit() {
        const imageFileUris: [string] = JSON.parse(this.activatedRoute.snapshot.paramMap.get('imageFileUris') as string);

        this.imagePreviewWebViewPaths = imageFileUris.map((fileUri) => Capacitor.convertFileSrc(fileUri));
    }

    getBackButtonText() {
        return this.utils.isiOSPlatform() ? 'Home' : '';
    }
}
