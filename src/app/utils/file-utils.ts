import { Injectable } from '@angular/core';
import { FilePicker } from '@capawesome/capacitor-file-picker';

@Injectable({
    providedIn: 'root'
})
export class FileUtils {
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
}
