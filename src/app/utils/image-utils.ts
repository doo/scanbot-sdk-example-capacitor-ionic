import { Injectable } from '@angular/core';
import { Camera, GalleryPhoto } from '@capacitor/camera';

@Injectable({
    providedIn: 'root'
})
export class ImageUtils {
    constructor() { }

    async selectImagesFromLibrary(multipleImages?: boolean | undefined): Promise<string[]> {
        let photos: GalleryPhoto[] = [];
        try {
            //todo use capacitor-plugin-demo if we are able to use it
            photos = (await Camera.pickImages({
                quality: 100,
                correctOrientation: false,
                limit: multipleImages == true ? 0 : 1
            }))
                .photos
                .filter(photo => photo.path !== undefined);
        } catch (e: any) {
        }

        if (photos.length > 0)
            return photos.map(photos => photos.path!!);
        else
            throw new Error(`No image${multipleImages == true ? 's' : ''} picked`)
    }
}
