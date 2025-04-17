import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Capacitor } from '@capacitor/core';
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
import { crop, colorFilter, trash } from 'ionicons/icons';

import { CommonUtils } from '../../utils/common-utils';
import { ScanbotUtils } from '../../utils/scanbot-utils';

import { DocumentData, PageData, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';
import { CroppingConfiguration, startCroppingScreen } from 'capacitor-plugin-scanbot-sdk/ui_v2';

@Component({
  selector: 'app-page-result',
  templateUrl: './page-result.page.html',
  styleUrls: ['./page-result.page.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
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
  pagePreviewWebViewPath!: string;
  page!: PageData;
  documentID!: string;
  removePageAlertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Remove page?',
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
      const documentID = params.get('documentID') as string;
      const pageID = params.get('pageID') as string;
      await this.loadDocument(documentID, pageID);
    });
  }

  private updatePage(updatedDocument: DocumentData) {
    this.documentID = updatedDocument.uuid;
    this.page = updatedDocument.pages.find((p) => p.uuid === this.page.uuid)!;
    this.pagePreviewWebViewPath = Capacitor.convertFileSrc(
      (this.page.documentImagePreviewURI || this.page.originalImageURI) + '?' + Date.now(),
    );
  }

  private async loadDocument(documentID: string, pageID: string) {
    try {
      // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
      if (!(await this.isLicenseValid())) {
        return;
      }
      /** Load the document from disc */
      const documentResult = await ScanbotSDK.Document.loadDocument(documentID);

      this.documentID = documentResult.uuid;
      this.page = documentResult.pages.find((p) => p.uuid === pageID)!;
      this.pagePreviewWebViewPath = Capacitor.convertFileSrc(
        (this.page.documentImagePreviewURI || this.page.originalImageURI) + '?' + Date.now(),
      );
    } catch (e: any) {
      await this.utils.showErrorAlert(e.message);
    }
  }

  async crop() {
    try {
      // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
      if (!(await this.isLicenseValid())) {
        return;
      }
      /**
       * Create the Cropping configuration object and
       * start the Cropping UI with the configuration, documentUUID and pageUUID
       */
      const configuration = new CroppingConfiguration({
        documentUuid: this.documentID,
        pageUuid: this.page.uuid,
      });

      const documentResult = await startCroppingScreen(configuration);

      if (documentResult.status === 'OK' && documentResult.data) {
        this.updatePage(documentResult.data);
      }
    } catch (e: any) {
      this.utils.showErrorAlert(e.message);
    }
  }

  async applyFilter() {
    try {
      // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
      if (!(await this.isLicenseValid())) {
        return;
      }
      // Choose one of the available filters
      const pageFilter = await this.scanbotUtils.chooseFilter();

      if (pageFilter) {
        await this.utils.showLoader();
        /** Modify the page by applying the selected filter */
        const documentResult = await ScanbotSDK.Document.modifyPage({
          documentID: this.documentID,
          pageID: this.page.uuid,
          filters: [pageFilter],
        });

        this.updatePage(documentResult);
      }
    } catch (e: any) {
      await this.utils.showErrorAlert(e.message);
    } finally {
      await this.utils.dismissLoader();
    }
  }

  async removePage() {
    try {
      // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
      if (!(await this.isLicenseValid())) {
        return;
      }

      await this.utils.showLoader();

      /** Remove the page from storage */
      await ScanbotSDK.Document.removePage({
        documentID: this.documentID,
        pageID: this.page.uuid,
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

  private async isLicenseValid(): Promise<boolean> {
    const licenseInfo = await ScanbotSDK.getLicenseInfo();

    if (licenseInfo.isLicenseValid) {
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
