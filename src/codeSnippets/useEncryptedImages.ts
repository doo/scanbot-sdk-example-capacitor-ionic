import { ScanbotSDK } from 'capacitor-plugin-scanbot-sdk';

async function initializeDisplayEncryptedImage() {
    try {
        // Always make sure you have a valid license on runtime via ScanbotSDK.getLicenseInfo()
        if (!(await ScanbotSDK.getLicenseInfo()).isLicenseValid) {
            return;
        }

        // Use the low-res image file "documentPreviewImageFileUri" of a Page for the preview:
        const result = await ScanbotSDK.getImageData({
            imageFileUri: '{imageFileUri}'
        });

        const decryptedImageDataAsBase64 = result.base64ImageData;

        // Use base64 image data to display the image
    } catch (error: any) {
        console.error(error);
    }
}