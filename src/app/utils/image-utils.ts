import { Injectable } from '@angular/core';
import { FilePicker, PickedFile } from '@capawesome/capacitor-file-picker';

@Injectable({
    providedIn: 'root'
})
export class ImageUtils {
    constructor() { }

    async selectImagesFromLibrary(multipleImages?: boolean | undefined): Promise<string[]> {
        let photos: PickedFile[] = [];
        try {
            photos = (await FilePicker.pickImages({
                multiple: multipleImages ?? false,
                readData: false,
                skipTranscoding: true
            }))
                .files
                .filter(photo => photo.path !== undefined);
        } catch (e: any) {
        }

        if (photos.length > 0)
            return photos.map(photos => photos.path!!);
        else
            throw new Error(`No image${multipleImages == true ? 's' : ''} picked`)
    }
}
