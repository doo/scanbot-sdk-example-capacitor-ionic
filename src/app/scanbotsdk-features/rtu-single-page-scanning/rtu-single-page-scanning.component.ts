import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Feature, FeatureId } from 'src/app/utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';
import { Colors } from 'src/theme/theme';

import {
    DocumentScanningFlow,
    PageSnapCheckMarkAnimation,
    PageSnapFunnelAnimation,
    startDocumentScanner,
} from 'capacitor-plugin-scanbot-sdk/ui_v2';

@Component({
    selector: 'app-rtu-single-page-scanning',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class RtuSinglePageScanningComponent extends ScanbotSdkFeatureComponent {
    override feature: Feature = {
        id: FeatureId.SinglePageDocumentScanning,
        title: 'Single Page Scanning',
    };

    override async featureClicked(): Promise<void> {
        try {
            // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
            if (!(await this.isLicenseValid())) {
                return;
            }

            /**
             * Create the document configuration object and
             * start the document scanner with the configuration
             */
            const configuration = new DocumentScanningFlow();
            // Disable the multiple page behavior
            configuration.outputSettings.pagesScanLimit = 1;
            // Enable/Disable the review screen.
            configuration.screens.review.enabled = false;
            // Enable/Disable Auto Snapping behavior
            configuration.screens.camera.cameraConfiguration.autoSnappingEnabled =
                true;

            /**
             * Configure the animation
             * You can choose between genie animation or checkmark animation
             * Note: Both modes can be further configured to your liking
             * e.g for genie animation
             */
            configuration.screens.camera.captureFeedback.snapFeedbackMode =
                new PageSnapFunnelAnimation({});
            // or for checkmark animation
            configuration.screens.camera.captureFeedback.snapFeedbackMode =
                new PageSnapCheckMarkAnimation({});

            // Hide the auto snapping enable/disable button
            configuration.screens.camera.bottomBar.autoSnappingModeButton.visible =
                false;
            configuration.screens.camera.bottomBar.manualSnappingModeButton.visible =
                false;
            configuration.screens.camera.bottomBar.importButton.title.visible =
                true;
            configuration.screens.camera.bottomBar.torchOnButton.title.visible =
                true;
            configuration.screens.camera.bottomBar.torchOffButton.title.visible =
                true;

            // Set colors
            configuration.palette.sbColorPrimary = Colors.scanbotRed;
            configuration.palette.sbColorOnPrimary = '#ffffff';

            // Configure the hint texts for different scenarios
            configuration.screens.camera.userGuidance.statesTitles.tooDark =
                'Need more lighting to detect a document';
            configuration.screens.camera.userGuidance.statesTitles.tooSmall =
                'Document too small';
            configuration.screens.camera.userGuidance.statesTitles.noDocumentFound =
                'Could not detect a document';

            const documentResult = await startDocumentScanner(configuration);
            /**
             * Handle the result if status is OK
             */
            if (documentResult.status === 'OK') {
                this.router.navigate(['/document-result', documentResult.uuid]);
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }
}
