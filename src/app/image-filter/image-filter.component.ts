import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { ImageFilter, ScanbotService } from 'src/app/services/scanbot.service';

@Component({
    selector: 'app-image-filter',
    templateUrl: './image-filter.component.html',
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
    })
export class ImageFilterComponent {

  private scanbot = inject(ScanbotService);
  private modalCtrl = inject(ModalController);

  imageFilters: ImageFilter[] = this.scanbot.getImageFilters();

  constructor() { }

  dismiss(selectedFilter?: ImageFilter | undefined) {
      this.modalCtrl.dismiss(selectedFilter?.type);
  }
}
