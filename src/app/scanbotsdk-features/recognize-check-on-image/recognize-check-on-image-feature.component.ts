import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { Feature, FeatureId } from 'src/app/services/scanbot.service';

@Component({
    selector: 'app-recognize-check-on-image-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class RecognizeCheckOnImageFeature extends ScanbotSdkFeatureComponent {
    override feature: Feature = {
        id: FeatureId.RecognizeCheckOnImage,
        title: 'Import Image and Recognize Check',
    };

    override async run() {
        try {
            this.utils.showLoader();
            const result = await this.scanbot.scanCheckFromImage();
            this.utils.dismissLoader();

            if (result.checkStatus === 'SUCCESS') {
                const checkResultAsJson = JSON.stringify(result);

                console.log(checkResultAsJson);
                this.router.navigate([
                    '/check-result-fields',
                    checkResultAsJson,
                ]);
            } else {
                this.utils.showInfoAlert(
                    'The check was not found in the given image.',
                );
            }
        } catch (e: any) {
            await this.utils.dismissLoader();
            this.utils.showErrorAlert(e.message);
        }
    }
}
