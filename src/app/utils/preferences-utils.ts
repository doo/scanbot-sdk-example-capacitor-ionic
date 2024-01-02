import { Injectable, inject } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

import { CommonUtils } from './common-utils';

import { Page } from 'capacitor-plugin-scanbot-sdk';

@Injectable({
    providedIn: 'root',
})
export class PreferencesUtils {
    private commonUtils = inject(CommonUtils);
    private appContainerID: string | undefined

    private pagesListKey = 'pagesList';

    constructor() { }

    async getAllPagesFromPrefs(): Promise<Page[]> {
        const allPagesAsJson = (
            await Preferences.get({ key: this.pagesListKey })
        ).value;

        let pages: Page[] = JSON.parse(allPagesAsJson ?? '[]');

        if (pages.length > 0 && this.commonUtils.isiOSPlatform()) {
            // When rebuilding, app container folder is changed and saved Uris are wrong (use old app container id)
            await this.fixAppContainerIDInSavedUris(pages);
        }

        return pages;
    }

    private async savePagesListInPrefs(pagesList: Page[]) {
        await Preferences.set({
            key: this.pagesListKey,
            value: JSON.stringify(pagesList),
        });
    }

    async getPageById(pageId: string): Promise<Page | undefined> {
        const pagesList = await this.getAllPagesFromPrefs();
        return pagesList.find((x) => x.pageId == pageId);
    }

    async savePage(page: Page) {
        const pagesList = await this.getAllPagesFromPrefs();
        pagesList.push(page);

        await this.savePagesListInPrefs(pagesList);
    }

    async savePages(pages: Page[]) {
        const pagesList = await this.getAllPagesFromPrefs();
        pages.forEach((page) => {
            pagesList.push(page);
        });

        await this.savePagesListInPrefs(pagesList);
    }

    async updatePage(page: Page) {
        const pagesList = await this.getAllPagesFromPrefs();
        const pageIndex = pagesList.findIndex((x) => x.pageId == page.pageId);

        if (pageIndex >= 0) {
            pagesList[pageIndex] = page;

            await this.savePagesListInPrefs(pagesList);
        }
    }

    async deletePageById(pageId: string) {
        const pagesList = await this.getAllPagesFromPrefs();
        const pageIndex = pagesList.findIndex((x) => x.pageId == pageId);

        if (pageIndex >= 0) {
            pagesList.splice(pageIndex, 1);

            await this.savePagesListInPrefs(pagesList);
        }
    }

    async deleteAllPages() {
        await Preferences.remove({ key: this.pagesListKey });
    }

    private async fixAppContainerIDInSavedUris(pages: Page[]) {
        try {
            const appContainerIDRegex = '\/Application\/([^\/]*)'

            if (!this.appContainerID) {
                let appMainFolderUri = (await Filesystem.getUri({ path: '', directory: Directory.Data })).uri
                this.appContainerID = appMainFolderUri.match(appContainerIDRegex)?.[1];
            }

            if (this.appContainerID) {
                pages.forEach(page => {
                    // App container is the same for all properties
                    let savedAppContainerID = page.originalImageFileUri.match(appContainerIDRegex)?.[1];

                    if (savedAppContainerID && savedAppContainerID != this.appContainerID) {
                        page.originalImageFileUri = page.originalImageFileUri.replace(savedAppContainerID, this.appContainerID!!)
                        page.documentImageFileUri = page.documentImageFileUri?.replace(savedAppContainerID, this.appContainerID!!)
                        page.originalPreviewImageFileUri = page.originalPreviewImageFileUri.replace(savedAppContainerID, this.appContainerID!!)
                        page.documentPreviewImageFileUri = page.documentPreviewImageFileUri?.replace(savedAppContainerID, this.appContainerID!!)
                    }
                });
            }
        } catch { }
    }
}
