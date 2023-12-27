import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, GalleryPhoto } from '@capacitor/camera';

@Injectable({
    providedIn: 'root',
})
export class ImageUtils {
    constructor() { }

    async selectImagesFromLibrary(): Promise<string[]> {
        let photos: GalleryPhoto[] = [];
        let pickImagesErrorMessage;

        try {
            photos = (
                await Camera.pickImages({
                    quality: 100,
                    correctOrientation: true,
                    limit: 0,
                })
            ).photos.filter((photo) => photo.path !== undefined);
        } catch (e: any) {
            pickImagesErrorMessage = e.message;
        }

        if (photos.length > 0) {
            return photos.map((photos) => photos.path!!);
        } else {
            throw new Error(
                `No images picked${pickImagesErrorMessage ? '. ' + pickImagesErrorMessage : ''
                }`,
            );
        }
    }

    async selectImageFromLibrary(): Promise<string> {
        let photo;
        let pickImageErrorMessage;

        try {
            photo = (
                await Camera.getPhoto({
                    quality: 100,
                    allowEditing: false,
                    resultType: CameraResultType.Uri,
                    saveToGallery: false,
                    correctOrientation: true,
                    source: CameraSource.Photos,
                })
            );
        } catch (e: any) {
            pickImageErrorMessage = e.message;
        }

        if (photo?.path) {
            return photo.path;
        } else {
            throw new Error(
                `No image picked${pickImageErrorMessage ? '. ' + pickImageErrorMessage : ''
                }`,
            );
        }
    }
}
