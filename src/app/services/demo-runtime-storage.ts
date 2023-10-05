import { Page } from "capacitor-plugin-scanbot-sdk";

export class DemoRuntimeStorage {
    private static instance: DemoRuntimeStorage
    static get default(): DemoRuntimeStorage {
        if (DemoRuntimeStorage.instance == null) {
            DemoRuntimeStorage.instance = new DemoRuntimeStorage()
        }

        return DemoRuntimeStorage.instance;
    }

    private _allPages: Page[] = [];
    public get allPages(): Page[] {
        return [...this._allPages];
    }

    public get allPagePreviewUris(): string[] {
        return this._allPages
            .map((page) => page.documentPreviewImageFileUri ?? page.originalPreviewImageFileUri)
            .filter((uri) => uri !== undefined)
            .map(uri => uri!)
    }

    public get allPageOriginalUris(): string[] {
        return this._allPages
        .map((page) => page.originalImageFileUri)
        .filter((uri) => uri !== undefined)
        .map(uri => uri!)
    }

    public addPage(page: Page) {
        this._allPages.push(page);
    }

    public addPages(pages: Page[]) {
        pages.forEach((page) => this.addPage(page))
    }

    public updatePage(page: Page) {
        for (let i=0; i < this._allPages.length; ++i) {
            const currentPage = this._allPages[i];
            if (currentPage.pageId === page.pageId) {
                this._allPages[i] = page;
                return;
            }
        }
    }

    public updatePages(pages: Page[]) {
        pages.forEach((page) => this.updatePage(page));
    }

    public getPageById(id: string): Page | undefined {
        const pages = this._allPages.filter((page) => page.pageId === id)
        if (pages == null || pages.length <= 0) {
            return undefined;
        }

        return pages[0];
    }

    public removePage(page: Page) {
        this._allPages = this._allPages.filter((el) => el.pageId !== page.pageId);
    }

    public removeAllPages() {
        this._allPages = [];
    }
}