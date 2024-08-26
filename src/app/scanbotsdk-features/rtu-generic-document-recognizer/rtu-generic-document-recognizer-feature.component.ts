import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/utils/scanbot-utils';

import { GenericDocumentRecognizerConfiguration, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-rtu-generic-document-recognizer-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class RtuGenericDocumentRecognizerFeature extends ScanbotSdkFeatureComponent {
    override feature = {
        id: FeatureId.ScanGenericDocument,
        title: 'Scan Generic Document',
    };

    override async featureClicked() {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        const configuration: GenericDocumentRecognizerConfiguration = {
            // Customize colors, text resources, behavior, etc..
        };

        try {
            const result = await ScanbotSDK.startGenericDocumentRecognizer(configuration);

            if (result.status === 'OK' && result.documents.length > 0) {
                // Handle the extracted data
                const documentsResultAsJson = JSON.stringify(result.documents);

                this.router.navigate([
                    '/generic-document-result-fields',
                    documentsResultAsJson
                ]);
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }
}
