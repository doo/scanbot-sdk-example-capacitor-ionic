import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { RouterLink } from "@angular/router";

import { ScanbotSdkFeatureComponent } from "../scanbotsdk-feature.component";
import { Feature, FeatureId } from "../../utils/scanbot-utils";
import { Colors } from "../../../theme/theme";

import { ScanbotSDK, VinScannerConfiguration } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-rtu-vin-scanner',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class RtuVinScannerComponent extends ScanbotSdkFeatureComponent {
    override feature: Feature = {
        id: FeatureId.VINScanner,
        title: 'Scan VIN',
    };

    override async featureClicked() {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        const configuration: VinScannerConfiguration = {
            topBarBackgroundColor: Colors.scanbotRed,
            finderLineColor: Colors.scanbotRed
            // Other UI configs...
        };

        try {
            const result = await ScanbotSDK.startVinScanner(configuration);

            if (result.status === 'OK') {
                // Handle the extracted data
                this.utils.showResultInfo(
                    `• Raw Text: ${result.rawText} <br />` +
                    `• Confidence: ${Math.round(result.confidenceValue * 100)}% <br />` +
                    `• Validation: ${result.validationSuccessful ? 'SUCCESSFUL' : 'NOT SUCCESSFUL'}`);
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }

}
