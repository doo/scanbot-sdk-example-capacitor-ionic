import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';

import { ImageFilter, ScanbotUtils } from '../utils/scanbot-utils';

@Component({
    selector: 'app-image-filter',
    templateUrl: './image-filter.component.html',
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class ImageFilterComponent {
    private scanbotUtils = inject(ScanbotUtils);
    private modalCtrl = inject(ModalController);

    imageFilters: ImageFilter[] = this.scanbotUtils.getImageFilters();

    constructor() { }

    dismiss(selectedFilter?: ImageFilter | undefined) {
        this.modalCtrl.dismiss(selectedFilter?.filter);
    }
}
