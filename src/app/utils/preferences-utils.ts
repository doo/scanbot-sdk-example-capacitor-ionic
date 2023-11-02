import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Page } from 'capacitor-plugin-scanbot-sdk';

@Injectable({
    providedIn: 'root',
    })
export class PreferencesUtils {
    private pagesListKey = 'pagesList';

    constructor() {}

    async getAllPagesFromPrefs(): Promise<Page[]> {
        const allPagesAsJson = (
            await Preferences.get({ key: this.pagesListKey })
        ).value;
        return JSON.parse(allPagesAsJson ?? '[]');
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
}
