import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { FeatureId } from 'src/app/services/scanbot.service';

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

    override async run() {
        try {
            const result = await this.scanbot.scanGenericDocument();
            if (result.status === 'OK') {
                const documentResultAsJson = JSON.stringify(result);

                console.log(documentResultAsJson);
                this.router.navigate([
                    '/generic-document-result-fields',
                    documentResultAsJson,
                ]);
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }
}
