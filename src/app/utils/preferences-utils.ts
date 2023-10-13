import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Page } from 'capacitor-plugin-scanbot-sdk';

@Injectable({
    providedIn: 'root'
})
export class PreferencesUtils {

    private pagesListKey = 'pagesList';

    constructor() { }

    async getAllPagesFromPrefs(): Promise<Page[]> {
        const allPagesAsJson = (await Preferences.get({ key: this.pagesListKey })).value;
        return JSON.parse(allPagesAsJson ?? '[]');
    }

    private async savePagesListInPrefs(pagesList: Page[]) {
        await Preferences.set({ key: this.pagesListKey, value: JSON.stringify(pagesList) });
    }

    async savePage(page: Page) {
        const pagesList = await this.getAllPagesFromPrefs();
        pagesList.unshift(page);

        await this.savePagesListInPrefs(pagesList);
    }

    async savePages(pages: Page[]) {
        const pagesList = await this.getAllPagesFromPrefs();
        pages.forEach(page => {
            pagesList.push(page);
        });

        await this.savePagesListInPrefs(pagesList);
    }

    async deletePageById(pageId: string) {
        //todo should we delete from fs as well ??

        const pagesList = await this.getAllPagesFromPrefs();
        const pageIndex = pagesList.findIndex(x => x.pageId == pageId);

        if (pageIndex >= 0) {
            pagesList.splice(pageIndex, 1);

            await this.savePagesListInPrefs(pagesList);
        }
    }

    async deleteAllPages() {
        await Preferences.remove({ key: this.pagesListKey });
    }
}
