import { ImageUtils } from "../../../app/utils/image-utils";
import { ScanbotSDK } from "capacitor-plugin-scanbot-sdk";


async function detectDocumentDetection() {
    try {
        /**
         * Select an image from the Image Library
         * Return early if no image is selected or there is an issue with selecting an image
         **/
        const selectedImageResult = await new ImageUtils().selectImageFromLibrary();
        if (!selectedImageResult) {
            return;
        }
        /** Detect the document */
        const documentDetectionResult = await ScanbotSDK.detectDocument({
            imageFileUri: selectedImageResult,
        });
        //** Handle the result */
    } catch (e: any) {
        console.error(e.message);
    }
}
