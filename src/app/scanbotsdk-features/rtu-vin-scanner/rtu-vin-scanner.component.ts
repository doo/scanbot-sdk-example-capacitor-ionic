import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";
import {ScanbotSdkFeatureComponent} from "../scanbotsdk-feature.component";
import {Feature, FeatureId} from "../../utils/scanbot-utils";
import {ScanbotSDK} from "../../../../../scanbot-sdk-capacitor-plugin/src";
import {Colors} from "../../../theme/theme";
import {VinScannerConfiguration} from 'capacitor-plugin-scanbot-sdk';

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
        title: 'Start VIN Scanner',
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
            setTimeout(async () => {
                console.log(await ScanbotSDK.closeVinScanner(), "LOG")
            }, 5000)

            const result = await ScanbotSDK.startVinScanner(configuration);

            if (result.status === 'CANCELED') {
                // User has canceled the scanning operation
            } else {
                // Handle the extracted data
                this.utils.showResultInfo([
                        `- Raw Text: ${result.rawText}`, result.confidenceValue &&
                        `- Confidence: ${(result.confidenceValue * 100).toFixed(0)}%`,
                        `- Validation: ${result.validationSuccessful ? 'SUCCESSFUL' : 'NOT SUCCESSFUL'}`,
                    ].join('\n\n')
                );
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }

}