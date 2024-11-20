import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";
import {ScanbotSdkFeatureComponent} from "../scanbotsdk-feature.component";
import {Feature, FeatureId} from "../../utils/scanbot-utils";

import {ScanbotSDK} from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-rtu-pick-document-from-gallery',
    templateUrl: '../scanbotsdk-feature.component.html',
    styleUrls: ['../scanbotsdk-feature.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterLink],
})
export class RtuPickDocumentFromGalleryComponent extends ScanbotSdkFeatureComponent {

    override feature: Feature = {
        id: FeatureId.PickDocumentFromGallery,
        title: 'Pick From Gallery',
    };


    override async featureClicked(): Promise<void> {
        try {
            // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
            if (!(await this.isLicenseValid())) {
                return;
            }
            await this.utils.showLoader();
            // Select image from the library
            const imageFileUri = await this.imageUtils.selectImageFromLibrary();
            if (!imageFileUri) {
                return;
            }

            /** Create a document object */
            const documentResult = await ScanbotSDK.Document.createDocument({
                imageFileUris: [imageFileUri],
                documentDetection: true,
            });

            /** Handle result if status is OK */
            if (documentResult.status === 'OK') {
                this.router.navigate(['/document-result'], {
                    queryParams: {documentID: documentResult.uuid}
                })
            }
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        } finally {
            this.utils.dismissLoader()
        }
    }
}
