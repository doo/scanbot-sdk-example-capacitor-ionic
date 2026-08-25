import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { colorFilter, crop, trash } from 'ionicons/icons';

import { CommonUtils } from '../../utils/common-utils';
import { ScanbotUtils } from '../../utils/scanbot-utils';

import {
  CroppingStandaloneConfiguration,
  DocumentData,
  PageData,
  ScanbotDocument,
  ScanbotSDK,
} from 'capacitor-plugin-scanbot-sdk';
import { ModifyPageOptions } from 'capacitor-plugin-scanbot-sdk/dist/esm/types/base/ModifyPageOptions';

@Component({
  selector: 'app-page-result',
  templateUrl: './page-result.page.html',
  styleUrls: ['./page-result.page.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    FormsModule,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonAlert,
    IonImg,
  ],
})
export class PageResultPage implements OnInit {
  pagePreview!: string;
  page!: PageData;
  documentUuid!: string;
  removePageAlertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Remove page',
      role: 'destructive',
      handler: () => {
        this.removePage();
      },
    },
  ];
  protected readonly Date = Date;
  private navController = inject(NavController);
  private scanbotUtils = inject(ScanbotUtils);
  private utils = inject(CommonUtils);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    addIcons({ crop, colorFilter, trash });
  }

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async (params) => {
      const documentUuid = params.get('documentUuid') as string;
      const pageUuid = params.get('pageUuid') as string;
      await this.loadDocument(documentUuid, pageUuid);
    });
  }

  async crop() {
    try {
      // Always make sure you have a valid license at runtime via ScanbotSDK.getLicenseInfo()
      if (!(await this.isLicenseValid())) {
        return;
      }
      /**
       * Create the Cropping configuration object and
       * start the Cropping UI with the configuration, documentUUID and pageUUID
       */
      const configuration = new CroppingStandaloneConfiguration({
        documentUuid: this.documentUuid,
        pageUuid: this.page.uuid,
      });

      const documentResult = await ScanbotDocument.startCroppingScreen(configuration);

      if (documentResult.status === 'OK') {
        await this.updatePage(documentResult.data);
      }
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }

  async applyFilter() {
    try {
      // Always make sure you have a valid license at runtime via ScanbotSDK.getLicenseInfo()
      if (!(await this.isLicenseValid())) {
        return;
      }
      // Choose one of the available filters
      const pageFilter = await this.scanbotUtils.chooseFilter();

      if (pageFilter) {
        await this.utils.showLoader();
        /** Modify the page by applying the selected filter */
        const options = new ModifyPageOptions();
        options.filters = [pageFilter];

        const documentResult = await ScanbotDocument.modifyPage({
          documentUuid: this.documentUuid,
          pageUuid: this.page.uuid,
          options: options,
        });

        await this.updatePage(documentResult);
      }
    } catch (e: any) {
      await this.utils.showErrorAlert(e.message);
    } finally {
      await this.utils.dismissLoader();
    }
  }

  async removePage() {
    try {
      // Always make sure you have a valid license at runtime via ScanbotSDK.getLicenseInfo()
      if (!(await this.isLicenseValid())) {
        return;
      }

      await this.utils.showLoader();

      /** Remove the page from storage */
      await ScanbotDocument.removePages({
        documentUuid: this.documentUuid,
        pageUuids: [this.page.uuid],
      });
      this.navController.back();
    } catch (e: any) {
      await this.utils.showErrorAlert(e.message);
    } finally {
      await this.utils.dismissLoader();
    }
  }

  onBack() {
    this.navController.back();
  }

  private async updatePage(updatedDocument: DocumentData) {
    this.documentUuid = updatedDocument.uuid;
    this.page = updatedDocument.pages.find((p) => p.uuid === this.page.uuid)!;
    this.pagePreview = await this.scanbotUtils.getPageDataPreview(this.page);
  }

  private async loadDocument(documentUuid: string, pageUuid: string) {
    try {
      // Always make sure you have a valid license at runtime via ScanbotSDK.getLicenseInfo()
      if (!(await this.isLicenseValid())) {
        return;
      }
      /** Load the document from disc */
      const documentResult = await ScanbotDocument.loadDocument(documentUuid);

      this.documentUuid = documentResult.uuid;
      this.page = documentResult.pages.find((p) => p.uuid === pageUuid)!;
      this.pagePreview = await this.scanbotUtils.getPageDataPreview(this.page);
    } catch (e: any) {
      await this.utils.showErrorAlert(e.message);
    }
  }

  private async isLicenseValid(): Promise<boolean> {
    const licenseInfo = await ScanbotSDK.getLicenseInfo();

    if (licenseInfo.isValid) {
      // We have a valid (trial) license and can call other Scanbot SDK methods.
      // E.g. launch the Document Scanner
      return true;
    } else {
      // The license is not valid. We will return false and show the status
      this.utils.showWarningAlert(licenseInfo.licenseStatusMessage ?? 'Invalid License');
      return false;
    }
  }
}
