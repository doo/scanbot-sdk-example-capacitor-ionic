import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonUtils } from 'src/app/utils/common-utils';
import { PreferencesUtils } from 'src/app/utils/preferences-utils';
import { ActivatedRoute } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Page } from 'capacitor-plugin-scanbot-sdk';
import { ScanbotService } from 'src/app/services/scanbot.service';

@Component({
    selector: 'app-image-details',
    templateUrl: './image-details.page.html',
    styleUrls: ['./image-details.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
    })
export class ImageDetailsPage implements OnInit {
    pagePreviewWebViewPath?: string | undefined;
    page!: Page;

    private navController = inject(NavController);
    private activatedRoute = inject(ActivatedRoute);

    private scanbot = inject(ScanbotService);
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

    constructor() {}

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
        if (!(await this.scanbot.isLicenseValid())) {
            return;
        }

        try {
            await this.utils.showLoader();
            const result = await this.scanbot.cropPage(this.page);
            await this.utils.dismissLoader();

            if (result.status === 'OK') {
                if (result.page) {
                    this.updateResultUI(result.page);
                    await this.preferencesUtils.updatePage(result.page);
                } else {
                    this.utils.showErrorAlert('Something went wrong');
                }
            }
        } catch (e: any) {
            await this.utils.dismissLoader();
            this.utils.showErrorAlert(e.message);
        }
    }

    async applyFilter() {
        if (!(await this.scanbot.isLicenseValid())) {
            return;
        }

        try {
            const page = await this.scanbot.applyFilterOnPage({
                page: this.page,
                showLoader: true,
            });
            this.utils.dismissLoader();

            if (page) {
                this.updateResultUI(page);
                await this.preferencesUtils.updatePage(page);
            }
        } catch (e: any) {
            await this.utils.dismissLoader();
            this.utils.showErrorAlert(e.message);
        }
    }

    async deleteResult() {
        try {
            await this.preferencesUtils.deletePageById(this.page.pageId);
            await this.scanbot.removePage(this.page);
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
}
