import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
    DocumentScanningFlow,
    startDocumentScanner
} from "capacitor-plugin-scanbot-sdk/ui_v2";
import { Colors } from "../../../theme/theme";
import { Feature, FeatureId } from "../../utils/scanbot-utils";
import { ScanbotSdkFeatureComponent } from "../scanbotsdk-feature.component";

@Component({
    selector: 'app-rtu-multi-page-scanning',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule],
})
export class RtuMultiPageScanningComponent extends ScanbotSdkFeatureComponent {


    override feature: Feature = {
        id: FeatureId.MultiPageDocumentScanning,
        title: 'Multi Page Scanning',
    }

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
            // Enable the multiple page behavior
            configuration.outputSettings.pagesScanLimit = 0;

            // Enable/Disable Auto Snapping behavior
            configuration.screens.camera.cameraConfiguration.autoSnappingEnabled =
                true;

            // Hide/Reveal the auto snapping enable/disable button
            configuration.screens.camera.bottomBar.autoSnappingModeButton.visible =
                true;
            configuration.screens.camera.bottomBar.manualSnappingModeButton.visible =
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

            // Enable/Disable the review screen.
            configuration.screens.review.enabled = true;

            // Configure bottom bar (further properties like title, icon and  background can also be set for these buttons)
            configuration.screens.review.bottomBar.addButton.visible = true;
            configuration.screens.review.bottomBar.retakeButton.visible = true;
            configuration.screens.review.bottomBar.cropButton.visible = true;
            configuration.screens.review.bottomBar.rotateButton.visible = true;
            configuration.screens.review.bottomBar.deleteButton.visible = true;

            // Configure `more` popup on review screen
            configuration.screens.review.morePopup.reorderPages.icon.visible = true;
            configuration.screens.review.morePopup.deleteAll.icon.visible = true;
            configuration.screens.review.morePopup.deleteAll.title.text =
                'Delete all pages';

            // Configure reorder pages screen
            configuration.screens.reorderPages.topBarTitle.text = 'Reorder Pages';
            configuration.screens.reorderPages.guidance.title.text = 'Reorder Pages';

            // Configure cropping screen
            configuration.screens.cropping.topBarTitle.text = 'Cropping Screen';
            configuration.screens.cropping.bottomBar.resetButton.visible = true;
            configuration.screens.cropping.bottomBar.rotateButton.visible = true;
            configuration.screens.cropping.bottomBar.detectButton.visible = true;

            const documentResult = await startDocumentScanner(configuration);
            /**
             * Handle the result if result status is OK
             */
            if (documentResult.status === 'OK') {
                this.router.navigate(['/document-result', documentResult.uuid]);
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }
}
