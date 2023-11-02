import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/services/scanbot.service';

@Component({
    selector: 'app-extract-pages-from-pdf-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class ExtractPagesFromPdfFeature extends ScanbotSdkFeatureComponent {
    override feature = {
        id: FeatureId.ExtractPagesFromPdf,
        title: 'Extract pages from PDF',
    };

    override async run() {
        try {
            this.utils.showLoader();
            const result = await this.scanbot.extractPagesFromPdf();
            this.utils.dismissLoader();

            if (result.status === 'OK') {
                if (result.pages) {
                    await this.preferencesUtils.savePages(result.pages);
                    this.router.navigate(['/image-results']);
                } else {
                    this.utils.showInfoAlert('No pages extracted');
                }
            }
        } catch (e: any) {
            await this.utils.dismissLoader();
            this.utils.showErrorAlert(e.message);
        }
    }
}
