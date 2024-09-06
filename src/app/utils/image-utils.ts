import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
    providedIn: 'root',
})
export class ImageUtils {
    constructor() { }

    async selectImageFromLibrary(): Promise<string | undefined> {
        try {
            const photo = await Camera.getPhoto({
                quality: 100,
                allowEditing: false,
                resultType: CameraResultType.Uri,
                saveToGallery: false,
                correctOrientation: true,
                source: CameraSource.Photos,
            });

            return photo.path;
        } catch (e: any) {
            console.error(e.message);

            return undefined;
        }
    }
}
