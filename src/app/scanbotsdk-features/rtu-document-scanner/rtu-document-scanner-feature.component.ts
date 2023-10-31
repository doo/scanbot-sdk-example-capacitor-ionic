import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/services/scanbot.service';

@Component({
    selector: 'app-scanbotsdk-feature-document-scanner',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
    })
export class RtuDocumentScannerFeature extends ScanbotSdkFeatureComponent {
    override feature = {
        id: FeatureId.DocumentScanner,
        title: 'Scan Document',
    };

    override async run() {
        try {
            const documentResult = await this.scanbot.scanDocument();

            if (documentResult.status === 'OK') {
                await this.preferencesUtils.savePages(documentResult.pages);

                this.router.navigate(['/image-results']);
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }
}
