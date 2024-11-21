import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {
    AspectRatio,
    DocumentScanningFlow,
    startDocumentScanner
} from 'capacitor-plugin-scanbot-sdk/ui_v2';
import { Feature, FeatureId } from 'src/app/utils/scanbot-utils';
import { Colors } from 'src/theme/theme';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature.component';

@Component({
    selector: 'app-rtu-single-page-scanning-with-finder',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class RtuSinglePageScanningComponentWithFinder extends ScanbotSdkFeatureComponent {
    override feature: Feature = {
        id: FeatureId.SinglePageDocumentScanningWithFinder,
        title: 'Single Page Scanning With Finder',
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

            // Enable view finder
            configuration.screens.camera.viewFinder.visible = true;
            configuration.screens.camera.viewFinder.aspectRatio =
                new AspectRatio({
                    width: 3,
                    height: 4,
                });

            // Enable/Disable the review screen.
            configuration.screens.review.enabled = false;

            // Enable/Disable Auto Snapping behavior
            configuration.screens.camera.cameraConfiguration.autoSnappingEnabled =
                true;

            // Hide the auto snapping enable/disable button
            configuration.screens.camera.bottomBar.autoSnappingModeButton.visible =
                false;
            configuration.screens.camera.bottomBar.manualSnappingModeButton.visible =
                false;

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
             * Handle the result if  status is OK
             */
            if (documentResult.status === 'OK') {
                this.router.navigate(['/document-result', documentResult.uuid]);
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }
}
