import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/services/scanbot.service';

@Component({
    selector: 'app-rtu-document-scanner-with-finder-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class RtuDocumentScannerWithFinderFeature extends ScanbotSdkFeatureComponent {
    override feature = {
        id: FeatureId.FinderDocumentScanner,
        title: 'Document Scanner with Finder',
    };

    override async run() {
        try {
            const documentResult = await this.scanbot.scanDocumentWithFinder();

            if (documentResult.status === 'OK') {
                await this.preferencesUtils.savePages(documentResult.pages);

                this.router.navigate(['/image-results']);
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }
}
