import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Colors } from '../../../theme/theme';
import { Feature } from '../../utils/scanbot-utils';
import { ScanbotSdkFeatureComponent } from '../scanbotsdk-feature-component/scanbotsdk-feature.component';

import { DocumentScanningFlow, ScanbotDocument } from 'capacitor-plugin-scanbot-sdk';

@Component({
  selector: 'app-rtu-multi-page-scanning',
  templateUrl: '../scanbotsdk-feature-component/scanbotsdk-feature.component.html',
  styleUrls: ['../scanbotsdk-feature-component/scanbotsdk-feature.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class RtuMultiPageScanningComponent extends ScanbotSdkFeatureComponent {
  override feature: Feature = {
    title: 'Multi Page Scanning',
  };

  override async featureClicked(): Promise<void> {
    try {
      // Always make sure you have a valid license at runtime via ScanbotSDK.getLicenseInfo()
      if (!(await this.isLicenseValid())) {
        return;
      }
      /**
       * Create the document configuration object and
       * start the document scanner with the configuration
       */
      const configuration = new DocumentScanningFlow();
      // Enable the multiple-page behavior
      configuration.outputSettings.pagesScanLimit = 0;

      // Enable/Disable Auto Snapping behavior
      configuration.screens.camera.cameraConfiguration.autoSnappingEnabled = true;

      // Hide/Reveal the auto snapping enable/disable button
      configuration.screens.camera.toolbar.autoSnappingModeButton.visible = true;
      configuration.screens.camera.toolbar.manualSnappingModeButton.visible = true;

      // Set colors
      configuration.palette.sbColorPrimary = Colors.scanbotRed;
      configuration.palette.sbColorOnPrimary = '#ffffff';

      // Configure the hint texts for different scenarios
      configuration.screens.camera.userGuidance.statesTitles.tooDark =
        'Need more lighting to detect a document';
      configuration.screens.camera.userGuidance.statesTitles.tooSmall = 'Document too small';
      configuration.screens.camera.userGuidance.statesTitles.noDocumentFound =
        'Could not detect a document';

      // Enable/Disable the review screen.
      configuration.screens.review.enabled = true;

      // Configure the toolbar (further properties like title, icon and background can also be set for these buttons)
      configuration.screens.review.toolbar.addButton.barButton.visible = true;
      configuration.screens.review.toolbar.retakeButton.barButton.visible = true;
      configuration.screens.review.toolbar.cropButton.barButton.visible = true;
      configuration.screens.review.toolbar.rotateButton.barButton.visible = true;
      configuration.screens.review.toolbar.deleteButton.barButton.visible = true;

      // Configure `more` popup on review screen
      // TODO: CHECK
      // configuration.screens.review.morePopup.reorderPages.icon.visible = true;
      configuration.screens.review.morePopup.deleteAll.icon.visible = true;
      configuration.screens.review.morePopup.deleteAll.title.text = 'Delete all pages';

      // Configure reorder pages screen
      configuration.screens.reorderPages.topBarTitle.text = 'Reorder Pages';
      configuration.screens.reorderPages.guidance.title.text = 'Reorder Pages';

      // Configure cropping screen
      configuration.screens.cropping.topBarTitle.text = 'Cropping Screen';
      configuration.screens.cropping.toolbar.resetButton.visible = true;
      configuration.screens.cropping.toolbar.rotateButton.visible = true;
      configuration.screens.cropping.toolbar.detectButton.visible = true;

      const documentResult = await ScanbotDocument.startScanner(configuration);
      /**
       * Handle the result if the result status is OK
       */
      if (documentResult.status === 'OK') {
        this.router.navigate(['/document-result', documentResult.data.uuid]);
      }
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }
}
