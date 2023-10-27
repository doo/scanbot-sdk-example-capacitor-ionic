import { Injectable, inject } from '@angular/core';
import { FileOpener } from '@capacitor-community/file-opener';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { CommonUtils } from './common-utils';

@Injectable({
    providedIn: 'root'
})
export class FileUtils {

    private utils = inject(CommonUtils);

    constructor() { }

    async selectPdfFile(): Promise<string> {
        let pdfPath;
        let pickFilesErrorMessage;

        try {
            const pdfFIle = await FilePicker.pickFiles({
                types: ['application/pdf'],
                multiple: false,
                readData: false
            });
            pdfPath = pdfFIle.files[0].path;

            if (pdfPath)
                return pdfPath;
        } catch (e: any) {
            pickFilesErrorMessage = e.message;
        }

        throw new Error(`No file picked${pickFilesErrorMessage ? '. ' + pickFilesErrorMessage : ''}`);
    }

    async openPdfFile(fileURI?: string | undefined) {
        if (fileURI) {
            await FileOpener.open({
                filePath: fileURI,
                contentType: 'application/pdf',
                openWithDefault: false
            });
        }
        else
            this.utils.showWarningAlert('PDF file is not founded');
    }

    async openTiffFile(fileURI?: string | undefined) {
        if (fileURI) {
            await FileOpener.open({
                filePath: fileURI,
                contentType: 'image/tiff',
                openWithDefault: false
            });
        }
        else
            this.utils.showWarningAlert('TIFF file is not founded');
    }
}
