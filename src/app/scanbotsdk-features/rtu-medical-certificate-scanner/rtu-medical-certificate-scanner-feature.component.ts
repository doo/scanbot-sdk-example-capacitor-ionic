import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { Colors } from 'src/theme/theme';
import { FeatureId } from 'src/app/utils/scanbot-utils';

import { MedicalCertificateRecognizerConfiguration, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-rtu-medical-certificate-scanner-feature',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class RtuMedicalCertificateScannerFeature extends ScanbotSdkFeatureComponent {
    override feature = {
        id: FeatureId.ScanMedicalCertificate,
        title: 'Scan Medical Certificate',
    };

    override async featureClicked() {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        const configuration: MedicalCertificateRecognizerConfiguration = {
            // Customize colors, text resources, behavior, etc..
            topBarBackgroundColor: Colors.scanbotRed,
            userGuidanceStrings: {
                capturing: 'Capturing',
                scanning: 'Recognizing',
                processing: 'Processing',
                startScanning: 'Scanning started',
                paused: 'Paused',
                energySaving: 'Energy saving',
            },
            errorDialogMessage: 'An unexpected error occured.',
            errorDialogOkButton: 'OK',
            errorDialogTitle: 'ERROR',
            cancelButtonHidden: false,
            recognizePatientInfo: true,
            // see further configs...
        };

        try {
            const result = await ScanbotSDK.startMedicalCertificateRecognizer(configuration);

            if (result.status === 'OK') {
                // Handle the extracted data
                const medicalCertResultAsJson = JSON.stringify(result);

                this.router.navigate([
                    '/medical-certificate-result-fields',
                    medicalCertResultAsJson,
                ]);
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }
}
