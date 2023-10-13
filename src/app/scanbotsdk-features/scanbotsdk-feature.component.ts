import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Feature, ScanbotService } from '../services/scanbot.service';
import { CommonUtils } from '../utils/common-utils';
import { ImageUtils } from '../utils/image-utils';
import { PreferencesUtils } from '../utils/preferences-utils';

@Component({
  selector: 'app-scanbotsdk-feature',
  templateUrl: './scanbotsdk-feature.component.html',
  styleUrls: ['./scanbotsdk-feature.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
})
export class ScanbotsdkFeatureComponent {
  @Input() feature!: Feature;

  scanbot = inject(ScanbotService);
  utils = inject(CommonUtils);
  imageUtils = inject(ImageUtils);
  preferencesUtils = inject(PreferencesUtils);
  router = inject(Router);

  async featureClicked() {
    const isScanBotLicenseValid = await this.scanbot.isLicenseValid();
    if (!isScanBotLicenseValid)
      return;
  }
}
