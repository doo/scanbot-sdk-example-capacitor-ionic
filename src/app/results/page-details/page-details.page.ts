import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Capacitor } from '@capacitor/core';

import { CommonUtils } from 'src/app/utils/common-utils';
import { PreferencesUtils } from 'src/app/utils/preferences-utils';
import { Colors } from 'src/theme/theme';
import { ScanbotUtils } from 'src/app/utils/scanbot-utils';

import { CroppingConfiguration, Page, ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

@Component({
    selector: 'app-page-details',
    templateUrl: './page-details.page.html',
    styleUrls: ['./page-details.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
})
export class PageDetailsPage implements OnInit {
    pagePreviewWebViewPath?: string | undefined;
    page!: Page;

    private navController = inject(NavController);
    private activatedRoute = inject(ActivatedRoute);

    private scanbotUtils = inject(ScanbotUtils);
    private utils = inject(CommonUtils);
    private preferencesUtils = inject(PreferencesUtils);

    deleteResultAlertButtons = [
        {
            text: 'Cancel',
            role: 'cancel',
        },
        {
            text: 'Delete',
            role: 'destructive',
            handler: () => {
                this.deleteResult();
            },
        },
    ];

    constructor() { }

    async ngOnInit() {
        const pageId = this.activatedRoute.snapshot.paramMap.get(
            'pageId',
        ) as string;
        const page = await this.preferencesUtils.getPageById(pageId);

        if (page) {
            this.updateResultUI(page);
        } else {
            this.utils.showErrorAlert("Result can't be found", () => {
                this.navController.back();
            });
        }
    }

    getBackButtonText() {
        return this.utils.isiOSPlatform() ? 'Results' : '';
    }

    async crop() {
        // Always make sure you have a valid license on runtime via SDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        const configuration: CroppingConfiguration = {
            // Customize colors, text resources, behavior, etc..
            doneButtonTitle: 'Apply',
            topBarBackgroundColor: Colors.scanbotRed,
            bottomBarBackgroundColor: Colors.scanbotRed,
            orientationLockMode: 'NONE',
            swapTopBottomButtons: false,
            // see further configs ...
        };

        try {
            await this.utils.showLoader();

            const result = await ScanbotSDK.startCroppingScreen({
                page: this.page,
                configuration: configuration,
            });

            await this.utils.dismissLoader();
            if (result.status === 'CANCELED') {
                // User has canceled the scanning operation
            } else if (result.page) {
                // Handle the modified page object from result
                this.updateResultUI(result.page);
                await this.preferencesUtils.updatePage(result.page);
            } else {
                this.utils.showErrorAlert('Something went wrong');
            }
        } catch (e: any) {
            await this.utils.dismissLoader();
            this.utils.showErrorAlert(e.message);
        }
    }

    async applyFilter() {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await this.isLicenseValid())) {
            return;
        }

        try {
            // Choose one of the available filters
            const pageFilter = await this.scanbotUtils.chooseFilter();

            if (pageFilter) {
                await this.utils.showLoader();

                // Use the updated page
                const filteredPage: Page = await ScanbotSDK.applyImageFiltersOnPage({
                    page: this.page,
                    filters: [pageFilter],
                });

                this.utils.dismissLoader();
                // Reload the preview
                this.updateResultUI(filteredPage);
                await this.preferencesUtils.updatePage(filteredPage);
            }
        } catch (e: any) {
            await this.utils.dismissLoader();
            this.utils.showErrorAlert(e.message);
        }
    }

    async deleteResult() {
        try {
            await this.preferencesUtils.deletePageById(this.page.pageId);
            await ScanbotSDK.removePage({ page: this.page });
            this.navController.back();
        } catch (e: any) {
            this.utils.showErrorAlert(e.message);
        }
    }

    private updateResultUI(page: Page) {
        this.page = page;

        if (page.documentPreviewImageFileUri) {
            this.pagePreviewWebViewPath = Capacitor.convertFileSrc(
                page.documentPreviewImageFileUri,
            );
        } else {
            this.pagePreviewWebViewPath = '';
        }
    }

    private async isLicenseValid(): Promise<boolean> {
        const licenseInfo = await ScanbotSDK.getLicenseInfo();

        if (licenseInfo.isLicenseValid) {
            // We have a valid (trial) license and can call other Scanbot SDK methods.
            // E.g. launch the Document Scanner
            return true;
        } else {
            // The license is not valid. We will return false and show the status
            this.utils.showWarningAlert(
                this.scanbotUtils.getMessageFromLicenseStatus(licenseInfo.licenseStatus),
            );
            return false;
        }
    }
}
