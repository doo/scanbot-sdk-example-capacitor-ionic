import { ImageUtils } from "../../../app/utils/image-utils";
import { ScanbotSDK } from "capacitor-plugin-scanbot-sdk";

async function createTIFFFromImages() {
    try {
        /**
         * Select an image from the Image Library
         * Return early if no image is selected or there is an issue with selecting an image
         **/
        const selectedImageResult = await new ImageUtils().selectImageFromLibrary();
        if (!selectedImageResult) {
            return;
        }
        /** Create a TIFF file with the provided options */
        const tiffCreationResult = await ScanbotSDK.writeTIFF({
            imageFileUris: [selectedImageResult],
            options: {
                dpi: 300,
            },
        });
        /** Handle the result */
    } catch (e: any) {
    }
}
