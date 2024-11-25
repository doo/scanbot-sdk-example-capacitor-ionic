import {ImageUtils} from "../../../app/utils/image-utils";
import {ScanbotBinarizationFilter, ScanbotSDK} from "capacitor-plugin-scanbot-sdk";

async function applyFiltersOnImages() {
    try {
        /**
         * Select an image from the Image Library
         * Return early if no image is selected or there is an issue with selecting an image
         **/
        const selectedImageResult = await new ImageUtils().selectImageFromLibrary();
        if (!selectedImageResult) {
            return;
        }
        /** Apply ScanbotBinarizationFilter to the image */
        const imageWithFilters = await ScanbotSDK.applyImageFilters({
            imageFileUri: selectedImageResult,
            filters: [new ScanbotBinarizationFilter()],
        });
        /** Rotate the page counterclockwise by 90 degrees */
        const rotatedImage = await ScanbotSDK.rotateImage({
            imageFileUri: imageWithFilters.imageFileUri,
            degrees: 90,
        });

        return rotatedImage.imageFileUri;
    } catch (e: any) {
        console.error(e.message);
    }
}
